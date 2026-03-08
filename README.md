# Retail Frontend - Developer Guide

A Next.js-based retail management system for tracking payment transfers, managing fees, and generating reports. Built with TypeScript, Tailwind CSS, and modern React patterns.

## Table of Contents

- [Tech Stack](#tech-stack)
- [Project Architecture](#project-architecture)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Core Concepts](#core-concepts)
- [Development Workflow](#development-workflow)
- [API Integration](#api-integration)
- [Form Validation](#form-validation)
- [Styling System](#styling-system)
- [Component Patterns](#component-patterns)
- [Best Practices](#best-practices)
- [Common Tasks](#common-tasks)

---

## Tech Stack

### Core Framework

- **Next.js 14.0.4** - React framework with Pages Router (file-based routing)
- **React 18.2.0** - UI library
- **TypeScript 5.3.3** - Type-safe JavaScript

### API & Data Fetching

- **Axios 1.13.2** - HTTP client with interceptors for authentication
- **cookies-next 4.1.1** - Client-side cookie management for auth tokens

### Forms & Validation

- **React Hook Form 7.49.2** - Performant form state management
- **Zod 4.3.5** - TypeScript-first schema validation
- **@hookform/resolvers 5.2.2** - Zod integration with React Hook Form

### UI Components

- **Radix UI** - Headless, accessible UI primitives:
  - Dialog, Select, Popover, Accordion, Tabs, Label
- **Lucide React 0.294.0** - Icon library
- **Sonner 2.0.7** - Toast notifications

### Styling

- **Tailwind CSS 3.4.14** - Utility-first CSS framework
- **tailwindcss-animate 1.0.7** - Animation utilities
- **class-variance-authority 0.7.1** - Component variants
- **clsx 2.1.1** + **tailwind-merge 2.6.0** - Conditional class merging

### Utilities

- **date-fns 4.1.0** - Date manipulation
- **use-debounce 10.1.0** - Input debouncing
- **@svgr/webpack 8.1.0** - Import SVGs as React components

---

## Project Architecture

This application follows a **layered architecture** with clear separation of concerns:

```
┌─────────────────────────────────────┐
│         Pages (Routes)              │  ← File-based routing
├─────────────────────────────────────┤
│      Page Components                │  ← Feature-specific UI
├─────────────────────────────────────┤
│    Shared Components (UI/Form)      │  ← Reusable components
├─────────────────────────────────────┤
│      API Service Layer              │  ← Axios + service classes
├─────────────────────────────────────┤
│  Common (Types/Utils/Constants)     │  ← Shared code
└─────────────────────────────────────┘
```

### Key Architectural Decisions

1. **Pages Router** (not App Router) - Uses traditional Next.js routing
2. **Service Layer Pattern** - API calls abstracted into service classes
3. **Validation at Form Level** - Zod schemas with conditional validation
4. **Token-based Auth** - JWT stored in cookies with axios interceptors
5. **Component Composition** - Radix UI primitives wrapped in custom components
6. **CSS Variables + Tailwind** - Theme tokens defined as CSS variables

---

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager
- Access to backend API

### Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd retail-frontend
```

2. **Install dependencies**

```bash
npm install
```

3. **Environment Setup**

Create a `.env.local` file in the root directory:

```bash
# Copy from example
cp .env.example .env.local
```

Edit `.env.local`:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api
```

**Important**: The `NEXT_PUBLIC_` prefix is required for client-side environment variables in Next.js.

4. **Run Development Server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

```bash
npm run dev      # Start development server (with hot reload)
npm run build    # Create production build
npm run start    # Start production server (after build)
npm run lint     # Run ESLint for code quality checks
```

---

## Project Structure

```
retail-frontend/
├── pages/                      # Next.js Pages Router
│   ├── _app.tsx               # App wrapper (fonts, auth, toaster)
│   ├── _document.tsx          # HTML document structure
│   ├── index.tsx              # Home/Dashboard page (/)
│   ├── transfer-records/
│   │   ├── add.tsx           # Add record page (/transfer-records/add)
│   │   └── view.tsx          # View records page (/transfer-records/view)
│   └── transfer-fees/
│       └── add.tsx           # Add fees page (/transfer-fees/add)
│
├── components/
│   ├── ui/                    # Shadcn UI + Radix components
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── dialog.tsx
│   │   ├── select.tsx
│   │   ├── tabs.tsx
│   │   ├── accordion.tsx
│   │   ├── calendar.tsx
│   │   ├── date-picker.tsx
│   │   └── popover.tsx
│   │
│   ├── form/                  # Form wrapper components
│   │   ├── FormInput.tsx     # Controlled input with validation
│   │   ├── FormSelect.tsx    # Controlled select with validation
│   │   └── FormDatePicker.tsx # Controlled date picker
│   │
│   ├── pages/                 # Feature-specific components
│   │   ├── home/             # Dashboard components
│   │   ├── add-record/       # Record creation components
│   │   ├── add-fee/          # Fee management components
│   │   └── view-records/     # Records list components
│   │
│   ├── Header.tsx            # Navigation header
│   ├── If.tsx                # Conditional rendering helper
│   └── IfElse.tsx            # If/Else rendering helper
│
├── lib/
│   ├── api/                   # API service layer
│   │   ├── client.ts         # Axios instance + interceptors
│   │   ├── records.ts        # Record API service
│   │   ├── fees.ts           # Fee API service
│   │   ├── branch.ts         # Branch API service
│   │   └── total.ts          # Total API service
│   │
│   ├── store/
│   │   └── authStore.ts      # Authentication store
│   │
│   ├── fonts.ts              # Next.js font loading
│   └── utils.ts              # cn() utility
│
├── common/
│   ├── constants/
│   │   ├── index.ts          # API endpoints & routes
│   │   └── payment.ts        # Payment method options
│   │
│   ├── types/
│   │   └── index.ts          # TypeScript interfaces
│   │
│   ├── utils/
│   │   └── index.ts          # Utility functions
│   │
│   └── validators/
│       └── index.ts          # Zod validation schemas
│
├── public/
│   ├── images/               # Static images (payment logos)
│   └── icons/                # SVG icons
│
├── styles/
│   └── globals.css           # Global styles + CSS variables
│
├── types/
│   └── svg.d.ts              # SVG module declarations
│
├── utils/
│   └── cn.ts                 # Class name utility
│
├── next.config.js            # Next.js configuration
├── tailwind.config.js        # Tailwind CSS configuration
├── tsconfig.json             # TypeScript configuration
├── .eslintrc.json            # ESLint configuration
└── components.json           # Shadcn UI configuration
```

---

## Core Concepts

### 1. Routing (Pages Router)

This project uses Next.js **Pages Router** (not the newer App Router). Routes are defined by file structure:

```typescript
// pages/index.tsx → Route: /
// pages/transfer-records/add.tsx → Route: /transfer-records/add
// pages/transfer-records/view.tsx → Route: /transfer-records/view
```

**Navigation:**

```typescript
import { useRouter } from "next/router";

const router = useRouter();
router.push("/transfer-records/add");
```

### 2. Authentication Flow

Authentication is handled via **JWT tokens stored in cookies**:

```typescript
// 1. Token is retrieved from cookies
const token = getCookie("authToken");

// 2. Axios interceptor adds token to requests
config.headers.Authorization = `Bearer ${token}`;

// 3. 401 responses clear token and redirect
if (error.response?.status === 401) {
  deleteCookie("authToken");
  window.location.href = "/ssh";
}
```

**Auth Check in \_app.tsx:**

```typescript
useEffect(() => {
  const hasToken = checkAuth();
  if (!hasToken) {
    console.log("You are not logged in");
    // TODO: Redirect to login (currently just logs)
  }
}, [router.pathname]);
```

### 3. Component Organization

Components are organized by **type and feature**:

- **`components/ui/`** - Primitive UI components (buttons, inputs, dialogs)
- **`components/form/`** - Form-specific wrappers with validation
- **`components/pages/`** - Feature-specific components (organized by page)

**Example: Form Component Hierarchy**

```
FormInput (form wrapper with validation)
  └── Input (UI primitive from shadcn)
      └── HTML <input> element
```

---

## Development Workflow

### Adding a New Page

1. **Create page file** in `pages/` directory:

```typescript
// pages/my-feature/index.tsx
import { Header } from "@/components/Header";

export default function MyFeaturePage() {
  return (
    <>
      <Header backPath="/" />
      <div className="container mx-auto">
        {/* Your content */}
      </div>
    </>
  );
}
```

2. **Add route constant** in `common/constants/index.ts`:

```typescript
export const ROUTES = {
  // ... existing routes
  MY_FEATURE: "/my-feature",
} as const;
```

3. **Create page components** in `components/pages/my-feature/`:

```typescript
// components/pages/my-feature/MyComponent.tsx
export function MyComponent() {
  return <div>Component content</div>;
}
```

### Adding a New API Endpoint

1. **Add endpoint constant** in `common/constants/index.ts`:

```typescript
export const API_ENDPOINTS = {
  MY_FEATURE: {
    LIST: "/my-feature",
    CREATE: "/my-feature",
    GET: (id: string) => `/my-feature/${id}`,
  },
} as const;
```

2. **Define TypeScript types** in `common/types/index.ts`:

```typescript
export interface MyFeatureItem {
  id: string;
  name: string;
  createdAt: string;
}
```

3. **Create service** in `lib/api/my-feature.ts`:

```typescript
import { api } from "./client";
import { API_ENDPOINTS } from "@/common/constants";
import { MyFeatureItem } from "@/common/types";

export const myFeatureService = {
  async getAll() {
    return api.get<MyFeatureItem[]>(API_ENDPOINTS.MY_FEATURE.LIST);
  },

  async create(data: Partial<MyFeatureItem>) {
    return api.post<MyFeatureItem>(API_ENDPOINTS.MY_FEATURE.CREATE, data);
  },
};
```

4. **Use in component**:

```typescript
import { myFeatureService } from "@/lib/api/my-feature";
import { useState, useEffect } from "react";

export function MyFeatureList() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    myFeatureService.getAll()
      .then(setItems)
      .catch(console.error);
  }, []);

  return (
    <div>
      {items.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
}
```

### Adding a New Form

1. **Define Zod schema** in `common/validators/index.ts`:

```typescript
export const myFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  amount: z
    .string()
    .refine((val) => !isNaN(Number(removeNumberComma(val))), "Must be a number")
    .refine((val) => Number(removeNumberComma(val)) > 0, "Must be positive"),
});

export type MyFormData = z.infer<typeof myFormSchema>;
```

2. **Create form component**:

```typescript
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { myFormSchema, MyFormData } from "@/common/validators";
import { FormInput } from "@/components/form";
import { Button } from "@/components/ui/button";

export function MyForm() {
  const { control, handleSubmit } = useForm<MyFormData>({
    resolver: zodResolver(myFormSchema),
    defaultValues: {
      name: "",
      amount: "",
    },
  });

  const onSubmit = async (data: MyFormData) => {
    try {
      await myFeatureService.create(data);
      toast.success("Created successfully!");
    } catch (error) {
      toast.error("Failed to create");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <FormInput
        name="name"
        control={control}
        label="Name"
        placeholder="Enter name"
      />

      <FormInput
        name="amount"
        control={control}
        label="Amount"
        placeholder="Enter amount"
        isCurrency={true}
      />

      <Button type="submit">Submit</Button>
    </form>
  );
}
```

---

## API Integration

### API Client Configuration

The API client is configured in `lib/api/client.ts`:

```typescript
// Base configuration
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});
```

### Request Interceptor (Authentication)

Automatically adds Bearer token to all requests:

```typescript
apiClient.interceptors.request.use((config) => {
  const token = getCookie("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

### Response Interceptor (Error Handling)

Handles 401 errors globally:

```typescript
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      deleteCookie("authToken");
      window.location.href = "/ssh";
    }
    return Promise.reject(error);
  },
);
```

### API Response Structure

All API responses follow this structure:

```typescript
interface ApiResponse<T> {
  message?: string;
  status: number;
  success: boolean;
  data: T;
}
```

The `api.get()` and `api.post()` methods automatically unwrap `response.data.data`.

### Service Pattern

API calls are organized into service classes:

```typescript
// lib/api/records.ts
export const recordService = {
  async getRecents(params: { page: number; limit: number }) {
    const queryParams = new URLSearchParams({
      page: String(params.page),
      limit: String(params.limit),
    });
    const url = `${API_ENDPOINTS.RECORDS.LIST}?${queryParams.toString()}`;

    return api.get<{
      transferRecords: RecordItem[];
      pagination: Pagination;
    }>(url);
  },

  async create(data: CreateRecordApiInput) {
    return api.post<RecordItem>(API_ENDPOINTS.RECORDS.CREATE, data);
  },
};
```

### Blob Download Pattern

For downloading files (PDF, Excel):

```typescript
async generateReport(body: {
  startDate: string;
  endDate: string;
  fileType: "pdf" | "excel";
}) {
  return api.post<AxiosResponse<Blob>>(
    API_ENDPOINTS.RECORDS.REPORTS,
    body,
    { responseType: "blob" }
  );
}
```

Usage:

```typescript
const response = await recordService.generateReport({
  startDate: "2024-01-01",
  endDate: "2024-01-31",
  fileType: "pdf",
});

downloadBlob(response.data, "report.pdf");
```

### Error Handling

Errors are standardized:

```typescript
interface ApiError {
  message: string;
  status: number;
  success: boolean;
  details?: {
    [key: string]: string;
  }[];
}
```

Usage in components:

```typescript
try {
  await recordService.create(data);
  toast.success("Record created!");
} catch (error) {
  const apiError = error as ApiError;
  toast.error(apiError.message || "An error occurred");
}
```

---

## Form Validation

### Zod Schema Patterns

All validation schemas are in `common/validators/index.ts`.

#### Basic Schema

```typescript
export const mySchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
```

#### Conditional Validation

```typescript
export const createRecordSchema = ({
  selectedPay,
  selectedTab,
  hasBranches,
}: {
  selectedPay?: string;
  selectedTab?: string;
  hasBranches?: boolean;
}) => {
  let schema =
    selectedPay === "other" || selectedTab === "bank"
      ? requiredRecordSchema // Description required
      : baseRecordSchema; // Description optional

  if (hasBranches) {
    return schema.extend({
      branchId: z.string().min(1, "Branch is required"),
    });
  }

  return schema;
};
```

#### Number Validation with Comma Formatting

```typescript
amount: z
  .string("Required")
  .refine(
    (val) => !isNaN(Number(removeNumberComma(val))),
    "Must be a number"
  )
  .refine(
    (val) => Number(removeNumberComma(val)) > 0,
    "Must be positive"
  ),
```

#### Cross-Field Validation

```typescript
export const feeSchema = z.object({
  fees: z.array(
    z
      .object({
        from: z.string().refine(/* validation */),
        to: z.string().refine(/* validation */),
        fee: z.string().refine(/* validation */),
      })
      .refine(
        (data) => {
          const fromVal = Number(removeNumberComma(data.from));
          const toVal = Number(removeNumberComma(data.to));
          return fromVal < toVal;
        },
        {
          message: "From must be less than To",
          path: ["from"],
        },
      ),
  ),
});
```

### React Hook Form Integration

```typescript
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { mySchema, MyFormData } from "@/common/validators";

const { control, handleSubmit, watch, formState } = useForm<MyFormData>({
  resolver: zodResolver(mySchema),
  defaultValues: {
    email: "",
    password: "",
  },
});
```

### Form Component Usage

```typescript
<FormInput
  name="email"
  control={control}
  label="Email"
  placeholder="Enter email"
  type="email"
/>

<FormSelect
  name="branch"
  control={control}
  label="Branch"
  options={branches}
/>

<FormDatePicker
  name="date"
  control={control}
  label="Date"
/>
```

---

## Styling System

### Tailwind Configuration

The project uses a **custom Tailwind theme** with design tokens as CSS variables.

#### Custom Font Sizes


Usage:

```typescript
<p className="text-14px">Text content</p>
```

#### Custom Border Radius

```javascript
borderRadius: {
  '5': 'var(--radius-5)',   // 5px
  '8': 'var(--radius-8)',   // 8px
  '10': 'var(--radius-10)', // 10px
  '12': 'var(--radius-12)', // 12px
  '20': 'var(--radius-20)', // 20px
  '24': 'var(--radius-24)', // 24px
}
```

Usage:

```typescript
<div className="rounded-[10px]">Card</div>
```

#### Custom Colors

Colors are defined as CSS variables in `styles/globals.css`:

```css
:root {
  --primary: #007bff;
  --primary-dark: #0056b3;
  --primary-light: #66b3ff;
  --destructive: #dc3545;
  /* ... more colors */
}
```

Usage:

```typescript
<button className="bg-primary text-primary-foreground">
  Click me
</button>
```

### Font System

Three custom fonts with Myanmar language support:

```typescript
// lib/fonts.ts
export const notoSansMyanmar = Noto_Sans_Myanmar({
  variable: "--font-noto",
  subsets: ["myanmar"],
});

export const pyidaungsu = localFont({
  src: "./fonts/Pyidaungsu-2.5.3_Regular.ttf",
  variable: "--font-pyidaungsu",
});

export const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});
```

Applied in `_app.tsx`:

```typescript
<div className={cn(
  notoSansMyanmar.variable,
  pyidaungsu.variable,
  inter.variable,
)}>
```

Usage in Tailwind:

```typescript
<p className="font-primary">Primary font (Noto Sans Myanmar)</p>
<p className="font-secondary">Secondary font (Pyidaungsu)</p>
<p className="font-inter">Inter font</p>
```

### Conditional Class Names

Use the `cn()` utility for conditional classes:

```typescript
import { cn } from "@/lib/utils";

<div className={cn(
  "base-class",
  isActive && "active-class",
  error && "error-class"
)}>
```

The `cn()` function combines `clsx` and `tailwind-merge` to handle:

- Conditional classes
- Array of classes
- Object notation
- Conflicting Tailwind classes (latter wins)

---

## Component Patterns

### Conditional Rendering Components

#### If Component

```typescript
import { If } from "@/components/If";

<If condition={isVisible}>
  <p>This renders only if isVisible is true</p>
</If>
```

#### IfElse Component

```typescript
import { IfElse } from "@/components/IfElse";

<IfElse condition={hasData}>
  {{
    if: <div>Has data</div>,
    else: <div>No data</div>,
  }}
</IfElse>
```

### Form Components

All form components are wrappers around React Hook Form's Controller:

#### FormInput

```typescript
<FormInput
  name="amount"
  control={control}
  label="Amount"
  placeholder="Enter amount"
  type="text"
  isCurrency={true}           // Enables number formatting
  floatingLabel={true}        // Label floats on focus
  startIcon={<DollarIcon />}  // Icon before input
  endIcon={<InfoIcon />}      // Icon after input
  disabled={false}
/>
```

Features:

- Automatic validation error display
- Currency formatting (comma-separated thousands)
- Floating label animation
- Icon support
- Integration with react-hook-form

#### FormSelect

```typescript
<FormSelect
  name="branch"
  control={control}
  label="Branch"
  placeholder="Select branch"
  options={branches.map(b => ({
    value: b.id,
    label: b.name,
  }))}
  disabled={false}
/>
```

#### FormDatePicker

```typescript
<FormDatePicker
  name="date"
  control={control}
  label="Date"
  placeholder="Select date"
  disabled={false}
/>
```

### UI Components (Radix + Shadcn)

#### Button

```typescript
import { Button } from "@/components/ui/button";

<Button variant="default">Default</Button>
<Button variant="destructive">Delete</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>
<Button disabled>Disabled</Button>
```

#### Dialog

```typescript
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

<Dialog open={isOpen} onOpenChange={setIsOpen}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Dialog Title</DialogTitle>
    </DialogHeader>
    <div>Dialog content</div>
  </DialogContent>
</Dialog>
```

#### Tabs

```typescript
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Content 1</TabsContent>
  <TabsContent value="tab2">Content 2</TabsContent>
</Tabs>
```

#### Toast Notifications

```typescript
import { toast } from "sonner";

toast.success("Operation successful!");
toast.error("An error occurred");
toast.info("Information message");
toast.warning("Warning message");
```

---

## Best Practices

### 1. TypeScript Usage

**✅ Always define types for:**

- API responses
- Form data
- Component props
- Service return values

```typescript
// Good
interface MyComponentProps {
  title: string;
  onSubmit: (data: FormData) => void;
}

export function MyComponent({ title, onSubmit }: MyComponentProps) {
  // ...
}

// Bad
export function MyComponent(props) {
  // ...
}
```

### 2. Path Aliases

Use the `@/` path alias for imports:

```typescript
// Good
import { api } from "@/lib/api/client";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/common/constants";

// Bad
import { api } from "../../lib/api/client";
import { Button } from "../../../components/ui/button";
```

### 3. Error Handling

Always handle API errors:

```typescript
// Good
try {
  const data = await myService.getData();
  setData(data);
} catch (error) {
  const apiError = error as ApiError;
  toast.error(apiError.message || "Failed to load data");
  console.error(error);
}

// Bad
const data = await myService.getData();
setData(data);
```

### 4. Form Validation

Keep validation logic in Zod schemas:

```typescript
// Good - validation in schema
const schema = z.object({
  amount: z
    .string()
    .refine(
      (val) => Number(removeNumberComma(val)) > 0,
      "Amount must be positive",
    ),
});

// Bad - validation in component
const onSubmit = (data) => {
  if (Number(data.amount) <= 0) {
    setError("Amount must be positive");
    return;
  }
};
```

### 5. Component Organization

Keep components focused and single-responsibility:

```typescript
// Good - separate concerns
function RecordsList() {
  return records.map(record => (
    <RecordItem key={record.id} record={record} />
  ));
}

function RecordItem({ record }) {
  return <div>{record.name}</div>;
}

// Bad - everything in one component
function RecordsList() {
  return records.map(record => (
    <div key={record.id}>
      <div>{record.name}</div>
      <div>{record.amount}</div>
      {/* ... lots more JSX */}
    </div>
  ));
}
```

### 6. Constants

Use constants instead of magic strings:

```typescript
// Good
import { API_ENDPOINTS, ROUTES } from "@/common/constants";
router.push(ROUTES.ADD_RECORD);
api.get(API_ENDPOINTS.RECORDS.LIST);

// Bad
router.push("/transfer-records/add");
api.get("/transfer-records");
```

### 7. Loading and Error States

Always handle loading and error states:

```typescript
function MyComponent() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    myService.getData()
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>No data</div>;

  return <div>{/* Render data */}</div>;
}
```

---

## Common Tasks

### Adding a New UI Component

1. **Check if it exists in Radix UI** - Most components are based on Radix primitives
2. **Add to components/ui/** if it's a generic UI component
3. **Follow shadcn/ui patterns** for styling and variants

```typescript
// components/ui/my-component.tsx
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const myComponentVariants = cva(
  "base-classes",
  {
    variants: {
      variant: {
        default: "default-styles",
        secondary: "secondary-styles",
      },
      size: {
        sm: "small-styles",
        lg: "large-styles",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "sm",
    },
  }
);

export interface MyComponentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof myComponentVariants> {
  // Additional props
}

export function MyComponent({
  className,
  variant,
  size,
  ...props
}: MyComponentProps) {
  return (
    <div
      className={cn(myComponentVariants({ variant, size }), className)}
      {...props}
    />
  );
}
```

### Debugging API Issues

1. **Check Network Tab** in browser DevTools
2. **Check Console** for axios errors
3. **Verify token** is being sent:

```typescript
import { tokenUtils } from "@/lib/api/client";
console.log("Has token:", tokenUtils.hasToken());
console.log("Token value:", tokenUtils.getToken());
```

4. **Test endpoint directly**:

```typescript
import { api } from "@/lib/api/client";
api.get("/endpoint").then(console.log).catch(console.error);
```

### Working with Myanmar Language

The UI supports Myanmar (Burmese) language:

```typescript
// Validation messages in Myanmar
phoneNo: z
  .string("အချက်အလက်ဖြည့်ရန် *")
  .min(7, "ဖုန်းနံပါတ် သည် ၇ လုံးမှ ၁၁ လုံးကြားရှိရမည်"),
```

Fonts are configured to support Myanmar script:

- `font-primary` - Noto Sans Myanmar
- `font-secondary` - Pyidaungsu (local font)

### Currency Formatting

The project includes utilities for number/currency formatting:

```typescript
import { formatNumber, removeNumberComma } from "@/common/utils";

// Format number with commas
formatNumber(1234567); // "1,234,567"

// Remove commas before parsing
removeNumberComma("1,234,567"); // "1234567"
```

FormInput component handles this automatically with `isCurrency` prop:

```typescript
<FormInput
  name="amount"
  control={control}
  isCurrency={true}  // Auto-formats with commas
/>
```

### Date Handling

Use date-fns for date manipulation:

```typescript
import { format, parseISO } from "date-fns";

// Format date for display
format(new Date(), "yyyy-MM-dd");

// Parse ISO string
parseISO("2024-01-30");
```

FormDatePicker handles date string conversion:

```typescript
<FormDatePicker
  name="date"
  control={control}
  // Returns ISO date string: "2024-01-30"
/>
```

### SVG Icons

SVGs can be imported as React components:

```typescript
import MyIcon from "@/public/icons/my-icon.svg";

<MyIcon className="w-6 h-6" />
```

This is configured via `@svgr/webpack` in `next.config.js`.

---

## Troubleshooting

### TypeScript Errors

If TypeScript shows errors but the app works:

```bash
# Check TypeScript configuration
npm run build

# TypeScript errors are ignored in build (intentionally)
# See next.config.js: typescript: { ignoreBuildErrors: true }
```

### Environment Variables Not Loading

- Ensure `.env.local` exists
- Restart dev server after changing env vars
- Use `NEXT_PUBLIC_` prefix for client-side vars

### API Requests Failing

1. Check `.env.local` has correct `NEXT_PUBLIC_API_BASE_URL`
2. Verify backend is running
3. Check Network tab for actual error
4. Verify token exists: `tokenUtils.hasToken()`

### Styling Not Applied

1. Check if Tailwind classes are correct
2. Verify CSS variables are defined in `styles/globals.css`
3. Clear cache and restart: `rm -rf .next && npm run dev`

### Build Fails

```bash
# Clean build
rm -rf .next
rm -rf node_modules
npm install
npm run build
```

---

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Radix UI Documentation](https://www.radix-ui.com/docs/primitives)
- [React Hook Form Documentation](https://react-hook-form.com/)
- [Zod Documentation](https://zod.dev/)

---

## Contributing

When contributing to this project:

1. Follow existing patterns and conventions
2. Use TypeScript for type safety
3. Keep validation logic in Zod schemas
4. Organize components by feature
5. Write meaningful commit messages
6. Test your changes thoroughly

## License

[License information here]

...
