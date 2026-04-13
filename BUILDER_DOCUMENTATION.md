# Home Screen Builder - Design Documentation

## Overview

This document describes the unified "Home Screen Builder" page that consolidates all previously fragmented admin pages into a single, CMS-like interface.

---

## 1. Wireframe Description

### Layout Structure (Three-Column Design)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ SIDEBAR (256px)          │ MAIN CONTENT (flexible)    │ RIGHT PANEL (384px) │
│                          │                            │                     │
│ ┌──────────────────┐     │ ┌──────────────────────┐   │ ┌─────────────────┐ │
│ │ Logo + Title     │     │ │ TOP BAR              │   │ │ Preview Header  │ │
│ ├──────────────────┤     │ │ - Page Title         │   │ ├─────────────────┤ │
│ │ Navigation       │     │ │ - Save Button        │   │ │ Preview Controls│ │
│ │                  │     │ │ - Feature Toggles    │   │ │ - User Group    │ │
│ │ • Dashboard      │     │ ├──────────────────────┤   │ │ - Location      │ │
│ │ • Home Builder ★ │     │ │                      │   │ ├─────────────────┤ │
│ │ • Sections       │     │ │ EDITOR PANEL         │   │ │                 │ │
│ │ • Banners        │     │ │ (when section        │   │ │ MOBILE PREVIEW  │ │
│ │ • Services       │     │ │  selected)           │   │ │                 │ │
│ │ • Content        │     │ │ ┌────────────────┐   │   │ │ ┌─────────────┐ │ │
│ │ • Floating Bubble│     │ │ │ Section Header │   │   │ │ │ App Header  │ │ │
│ │ • App Config     │     │ │ ├────────────────┤   │   │ │ ├─────────────┤ │ │
│ │                  │     │ │ │ Basic Settings │   │   │ │ │ Search Bar  │ │ │
│ ├──────────────────┤     │ │ ├────────────────┤   │   │ │ │             │ │ │
│ │ User Profile     │     │ │ │ Dynamic Editor │   │   │ │ │  Sections   │ │ │
│ └──────────────────┘     │ │ │ (type-specific)│   │   │ │ │  Content    │ │ │
│                          │ │ └────────────────┘   │   │ │ │             │ │ │
│                          │ │                      │   │ │ ├─────────────┤ │ │
│                          │ │ OR                   │   │ │ │ Float Bubble│ │ │
│                          │ │                      │   │ │ └─────────────┘ │ │
│                          │ │ No Selection State   │   │ │                 │ │
│                          │ │ - Icon               │   │ ├─────────────────┤ │
│                          │ │ - Instruction text   │   │ │ Preview Info    │ │
│                          │                        │   │ └─────────────────┘ │
│                          └───────────────────────────┘                     │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Component Breakdown

### A. LEFT COLUMN - Control Panel (`SectionsListPanel`)

**Purpose:** Display all home screen sections in a sortable list with quick visibility toggles.

**Sub-components:**
1. `PanelHeader` - Title and instructions
2. `AddSectionButton` - Opens modal to add new section
3. `SectionsList` - Draggable list of sections
   - `SectionListItem` (repeated)
     - Drag handle icon
     - Type badge (color-coded)
     - Section name
     - User group indicator
     - Visibility toggle switch
4. `QuickStats` - Active/Hidden counts

**Features:**
- Drag & drop reordering (SortableJS)
- Click to select/edit
- Inline visibility toggle
- Color-coded by type

---

### B. CENTER COLUMN - Main Editor (`MainEditorPanel`)

**Purpose:** Full configuration editor for selected section.

#### Top Bar Component (`EditorTopBar`)
- Page title and subtitle
- Autosave indicator
- "Save All" button
- Feature toggles (VIP, Search, Bubble, Personalization)

#### No Selection State (`NoSelectionState`)
- Mouse pointer icon
- Instructional text

#### Editor Panel (`SectionEditor`)
When a section is selected:

1. **EditorHeader**
   - Section name
   - Type badge
   - Status indicator
   - Close button

2. **BasicSettings** (common to all types)
   - Section name input
   - Visibility toggle
   - User group dropdown (All/VIP/Normal)
   - Location dropdown (All/HN/HCM/DN)

3. **DynamicContentEditor** (type-specific)

   **Banner Editor (`BannerEditor`)**
   - Multi-language title tabs (VI/EN)
   - Image upload area with preview
   - Schedule (start/end datetime)
   - Action selector (None/Screen/URL/DeepLink)
   - Action value input

   **Service Editor (`ServiceEditor`)**
   - List of service items (draggable)
     - Name (VI/EN)
     - Icon selector
     - Enable/disable toggle
     - Delete button
   - "Add Service Item" button

   **Promotion Editor (`PromotionEditor`)**
   - Schedule (start/end datetime)
   - List of promotion items
     - Title (VI/EN)
     - Description (VI/EN)
     - Discount percentage
   - "Add Promotion" button

   **Content Editor (`ContentEditor`)**
   - List of articles
     - Title (VI/EN)
     - Excerpt
     - Edit/Delete actions
   - "Add Article" button

   **VIP Editor (`VIPEditor`)**
   - Multi-language title
   - Description textarea

---

### C. RIGHT COLUMN - Live Preview (`LivePreviewPanel`)

**Purpose:** Real-time mobile app simulation.

**Sub-components:**
1. `PreviewHeader` - Title with icon
2. `PreviewControls`
   - User group selector (All/VIP/Normal)
   - Location selector (All/HN/HCM/DN)
3. `MobilePreviewContainer`
   - Phone frame styling
   - App header
   - Search bar (conditional)
   - Rendered sections (filtered by preview settings)
   - Floating bubble (conditional)
4. `PreviewInfo` - Device info, mode indicator

---

## 3. State Structure

```javascript
// Global Application State
let appState = {
  // Array of home screen sections (ordered)
  sections: [
    {
      id: 'section-uuid',           // Unique identifier
      name: 'Welcome Banner',        // Display name
      type: 'banner',                // banner|service|promotion|content|vip
      visible: true,                 // Show/hide toggle
      userGroup: 'all',              // all|vip|normal
      location: 'all',               // all|HN|HCM|DN
      status: 'active',              // active|scheduled|inactive|expired
      content: {                     // Type-specific content
        // See content structures below
      }
    }
    // ... more sections
  ],
  
  // App-level feature flags
  appConfig: {
    enableVIP: true,
    enableSearch: true,
    enableFloatingBubble: false,
    enablePersonalization: true
  },
  
  // Preview simulation settings
  previewSettings: {
    userGroup: 'all',
    location: 'all'
  },
  
  // Currently selected section for editing
  selectedSectionId: null
};
```

### Content Structures by Type

```javascript
// Banner Section Content
{
  title: { vi: '...', en: '...' },
  image: 'url-or-base64',
  action: { type: 'none|screen|url|deeplink', value: '...' },
  startDate: 'ISO-8601',
  endDate: 'ISO-8601'
}

// Service Section Content
{
  items: [
    {
      id: 'svc-uuid',
      name: { vi: '...', en: '...' },
      icon: 'fa-icon-name',
      enabled: true
    }
  ]
}

// Promotion Section Content
{
  items: [
    {
      id: 'promo-uuid',
      title: { vi: '...', en: '...' },
      description: { vi: '...', en: '...' },
      discount: 20
    }
  ],
  startDate: 'ISO-8601',
  endDate: 'ISO-8601'
}

// Content Section Content
{
  articles: [
    {
      id: 'art-uuid',
      title: { vi: '...', en: '...' },
      excerpt: { vi: '...', en: '...' }
    }
  ]
}

// VIP Section Content
{
  title: { vi: '...', en: '...' },
  description: { vi: '...', en: '...' }
}
```

---

## 4. React/Next.js Component Structure (Future Implementation)

```
src/
├── components/
│   ├── HomeScreenBuilder/
│   │   ├── index.tsx                 # Main container
│   │   ├── LeftPanel/
│   │   │   ├── index.tsx             # SectionsListPanel
│   │   │   ├── SectionListItem.tsx
│   │   │   └── AddSectionModal.tsx
│   │   ├── CenterPanel/
│   │   │   ├── index.tsx             # MainEditorPanel
│   │   │   ├── EditorTopBar.tsx
│   │   │   ├── NoSelectionState.tsx
│   │   │   └── SectionEditor/
│   │   │       ├── index.tsx
│   │   │       ├── EditorHeader.tsx
│   │   │       ├── BasicSettings.tsx
│   │   │       └── DynamicEditor/
│   │   │           ├── index.tsx
│   │   │           ├── BannerEditor.tsx
│   │   │           ├── ServiceEditor.tsx
│   │   │           ├── PromotionEditor.tsx
│   │   │           ├── ContentEditor.tsx
│   │   │           └── VIPEditor.tsx
│   │   └── RightPanel/
│   │       ├── index.tsx             # LivePreviewPanel
│   │       ├── PreviewControls.tsx
│   │       ├── MobilePreview.tsx
│   │       └── PreviewSection/
│   │           ├── index.tsx
│   │           └── types.ts          # Render logic per type
│   └── shared/
│       ├── ToggleSwitch.tsx
│       ├── MultiLanguageTabs.tsx
│       ├── ImageUploader.tsx
│       └── StatusBadge.tsx
├── hooks/
│   ├── useHomeScreenState.ts         # State management
│   ├── useAutosave.ts                # Autosave logic
│   └── usePreviewFilter.ts           # Preview filtering
├── store/
│   ├── index.ts                      # Zustand/Redux store
│   └── slices/
│       └── homeScreenSlice.ts
├── types/
│   └── homeScreen.ts                 # TypeScript interfaces
└── utils/
    ├── api.ts                        # GraphQL API calls
    └── validators.ts                 # Form validation
```

---

## 5. Key Interactions

### Drag & Drop Reordering
- Library: SortableJS (or @dnd-kit for React)
- Trigger: Drag end event on section list
- Action: Update array order in state
- Feedback: Immediate preview update + autosave trigger

### Visibility Toggle
- Trigger: Toggle switch change
- Action: Update `visible` property
- Feedback: 
  - List item opacity change
  - Preview section appears/disappears
  - Stats counter updates
  - Autosave trigger

### Section Selection
- Trigger: Click on section list item
- Action: Set `selectedSectionId`
- Feedback: 
  - List item highlight
  - Editor panel slides in
  - Form fields populate

### Inline Editing
- Trigger: Input field change
- Action: Update section content in state
- Feedback:
  - Debounced autosave indicator
  - Preview update (for relevant fields)

### Preview Simulation
- Trigger: User group/location dropdown change
- Action: Update `previewSettings`
- Feedback:
  - Filter sections based on targeting rules
  - Re-render mobile preview

---

## 6. API Integration Notes

### GraphQL Schema Compatibility

The frontend state structure maps to existing backend schema:

```graphql
# Query
query GetHomeScreenConfig {
  sections {
    id
    name
    type
    visible
    userGroup
    location
    status
    content
  }
  appConfig {
    enableVIP
    enableSearch
    enableFloatingBubble
    enablePersonalization
  }
}

# Mutation
mutation UpdateHomeScreenConfig($input: HomeScreenConfigInput!) {
  updateHomeScreenConfig(input: $input) {
    success
    sections {
      id
      # ...
    }
  }
}
```

### Data Transformation

Minimal transformation needed - frontend state structure mirrors backend schema closely.

---

## 7. UX Guidelines

### Visual Hierarchy
1. **Primary**: Selected section editor (center)
2. **Secondary**: Sections list (left) - navigation context
3. **Tertiary**: Preview (right) - validation feedback

### Color Coding
- Banner: Blue (#dbeafe / #1e40af)
- Service: Green (#dcfce7 / #166534)
- Promotion: Yellow (#fef3c7 / #92400e)
- Content: Purple (#ddd6fe / #5b21b6)
- VIP: Pink (#fce7f3 / #9d174d)

### Feedback Patterns
- **Immediate**: Preview updates, toggle states
- **Delayed (1s)**: Autosave confirmation
- **Explicit**: "Save All" button with loading state

### Accessibility
- Keyboard navigation support
- ARIA labels on interactive elements
- Focus indicators
- Color contrast compliance

---

## 8. Migration Path from Legacy Pages

### Phase 1: Parallel Operation (Current)
- New builder.html exists alongside legacy pages
- Sidebar shows both options (Builder highlighted)
- Legacy pages marked as "(Legacy)"

### Phase 2: Feature Parity
- Ensure all legacy features exist in builder
- Test with business users
- Gather feedback

### Phase 3: Deprecation
- Remove legacy page links from sidebar
- Redirect legacy URLs to builder.html
- Archive old HTML files

### Phase 4: React Migration (Future)
- Rebuild using Next.js + TypeScript
- Add advanced features (versioning, A/B testing)
- Integrate with design system

---

## 9. File Reference

| File | Purpose |
|------|---------|
| `builder.html` | Main unified builder page (production-ready) |
| `js/common.js` | Shared utilities (sidebar, multi-lang tabs) |
| `index.html` | Dashboard overview (legacy) |
| `sections.html` | Sections management (legacy) |
| `banners.html` | Banner management (legacy) |
| `services.html` | Services management (legacy) |
| `content.html` | Content management (legacy) |
| `bubble.html` | Floating bubble config (legacy) |
| `config.html` | App configuration (legacy) |

---

## 10. Next Steps

1. **Test the builder.html** in browser
2. **Connect to real API** (replace mock data)
3. **User testing** with business stakeholders
4. **Iterate** based on feedback
5. **Plan React migration** for long-term maintainability

---

*Document Version: 1.0*  
*Last Updated: 2024*  
*Author: Senior Product Designer + Frontend Engineer*
