# AI Website Builder - Usage Guide

## Getting Started

1. Navigate to `/builder` to start building
2. Describe your website in natural language
3. Watch as the AI generates and builds your site
4. See the live preview in real-time

## Writing Effective Prompts

### Be Specific
Instead of: "Make a website"
Try: "Create a modern landing page for a coffee shop with a hero section, menu, and contact form"

### Include Design Details
- Mention color schemes: "Use blue and purple gradients"
- Specify layouts: "Grid layout with 3 columns"
- Request interactions: "Add hover effects and smooth scrolling"

### Iterative Refinement
After the initial generation:
1. Review the preview
2. Request specific changes
3. Build on previous iterations

Example conversation:
```
User: "Create a portfolio website with a hero section"
AI: [Generates basic portfolio]
User: "Make the hero section full-screen with a gradient background"
AI: [Updates the design]
User: "Add a project gallery below with cards"
AI: [Adds gallery section]
```

## Example Prompts

### Landing Pages
```
Create a SaaS landing page with:
- Hero section with headline and CTA button
- Features section with icons
- Pricing table with 3 tiers
- Footer with social links
Use a modern, professional design with blue as the primary color
```

### Web Applications
```
Build a todo list app with:
- Input field to add new todos
- List of todos with checkboxes
- Delete button for each todo
- Filter buttons (All, Active, Completed)
- Store data in localStorage
Use a clean, minimalist design
```

### Portfolio Sites
```
Create a developer portfolio with:
- Hero section with name and title
- About section with bio
- Projects gallery with 6 projects
- Skills section with tech stack
- Contact form
Use dark mode with accent colors
```

## Tips for Best Results

1. **Start Simple**: Begin with a basic structure, then add complexity
2. **One Feature at a Time**: Request incremental changes
3. **Be Clear About Functionality**: Specify if you want interactive features
4. **Mention Responsive Design**: If mobile support is important
5. **Specify Dependencies**: If you need specific libraries (though AI will usually add them automatically)

## What the AI Can Generate

- ✅ Complete Next.js applications
- ✅ React components with hooks
- ✅ Tailwind CSS styling
- ✅ Responsive layouts
- ✅ Interactive features (forms, modals, etc.)
- ✅ Local state management
- ✅ API integrations (structure/mock data)

## Limitations

- ❌ Backend/database implementations (no actual data persistence)
- ❌ External API keys (you'll need to add your own)
- ❌ Large file uploads
- ❌ Complex authentication systems

## Troubleshooting

### Build Fails
- Check the build logs at the bottom of the screen
- Ask the AI to fix specific errors
- Try simplifying the request

### Preview Not Loading
- Wait for the build process to complete
- Check if npm install succeeded
- Refresh the preview iframe

### AI Not Understanding
- Rephrase your request
- Break down complex requirements
- Provide examples of what you want

## Advanced Usage

### Custom Components
```
Create a reusable card component with:
- Image at the top
- Title and description
- CTA button
- Hover animation
Then use it in a grid of 6 cards
```

### State Management
```
Build a shopping cart with:
- Product list with add to cart buttons
- Cart sidebar showing items
- Quantity controls
- Total price calculation
Use React context for state management
```

### Multiple Pages
```
Create a multi-page site with:
- Home page (landing)
- About page
- Blog page with article cards
- Contact page with form
Add navigation header to all pages
```

## Getting Help

If you encounter issues:
1. Check the build logs for errors
2. Review the generated code in the file tree
3. Ask the AI to fix specific issues
4. Simplify your request and build incrementally

## Best Practices

1. **Start with Layout**: Define the structure first
2. **Add Styling**: Then focus on visual design
3. **Implement Interactions**: Finally add dynamic features
4. **Test Responsive**: Ask for mobile optimization
5. **Iterate**: Refine based on what you see

Remember: The AI works best with clear, specific instructions and iterative refinement!
