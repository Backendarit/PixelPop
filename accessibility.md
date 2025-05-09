#Pixel Pop 

Maisa Tuomenpuro, Henna-Riina Anttila, Heli Pyykkönen 

##Accessibility issues in the planning phase  

We started to plan our website layout in Figma. During the layout planning process we took the contrast between different colors, usage of semantic HTML, headings and alt attributes for all pictures into consideration from the beginning. We discussed whether the color contrasts were strong enough and agreed that accessibility is more important than visual style if a conflict arises. We wanted a clear and loose appearance with bright colors and with good contrast, and we checked that the color combinations used in the design meet contrast requirements. 

##Accessibility issues during implementation 

During implementation, one of the main issues we discussed was how to mark an image that visually acts as a page heading. On the admin login and admin panel pages, we use banner images that include text and serve as the main title for the page. 
We considered different options and decided to add a visually hidden <h1> element before the image for screen reader users. The image itself was marked with alt="" and aria-hidden="true", since the text content is already provided in the hidden heading. This ensures that screen readers will announce the page title correctly without repeating or reading decorative content unnecessarily. 
We initially struggled to navigate the site using a screen reader and keyboard, especially without visible focus indicators or prior experience. At first, we considered adding tabindex="0" to many elements just to make them keyboard-focusable and easier to follow visually. However, we later realized that tabindex should be used only on interactive elements for proper semantic structure. 

##General accessibility features across the website 

Focus styling for keyboard users 

We added a focus style to help people see where they are on the page when using the Tab key: 
 
`button:focus, 
a:focus, 
input:focus, 
select:focus, 
textarea:focus, 
[tabindex="0"]:focus { 
  outline: 3px solid #75004e; 
  outline-offset: 3px; 
  border-radius: 4px; 
  box-shadow: 0 0 10px #f0c; 
} `

Header 

The header uses semantic HTML and aria-label="Main navigation" to support screen reader navigation. 
 
    `<header class="site-header"> 
      <nav class="main-nav" aria-label="Main navigation"> `

All the links are clearly labeled so they are easy to understand. A decorative Pixel Heart button triggers sparkles and plays a sound. It includes an aria-label, title, and alt text to ensure it is accessible to users with visual impairments. 
 
   `<button id="heart" class="heart-button" aria-label="Pixel Hearts Sparkle time!" title="Spread some sparkle!"> 
    <img src="/images/favicon.png" alt="Pixel Heart" /> 
   </button> `

Footer 

In footer there is link to the admin login page. There is semantic elements for accessibility like <a>, <nav>, <p>, <span> -tags. 

Image texts 

All product images across the site including on the homepage, shop view, and admin panel have descriptive alt text. These are written by the admin when adding or editing a product and saved in the database. 
This ensures that screen reader users can understand the content and purpose of each image, whether they are browsing products or managing them in the admin panel. 
If for some reason a product is missing an alt text, the product name is used as a fallback to avoid having an empty or unclear description. 

Example in the product list: 

`{{#if this.altText}} 
  <img src="{{this.imageUrl}}" alt="{{this.altText}}" class="product-image"> 
{{else}} 
  <img src="{{this.imageUrl}}" alt="{{this.name}}" class="product-image"> 
{{/if}} `

This provides consistent and meaningful image descriptions site-wide. 

Skip to main content button 

To improve keyboard navigation and screen reader usability, we added a "Skip to main content" link to every page. This allows users who navigate with a keyboard or screen reader to skip repeated content like the navigation menu and jump directly to the main content area. 

`<a href="#main" class="skip-link">Skip to main content</a> 
<main id="main" class="content"> 
<!-- Page content --> 
</main> `

The link is hidden visually but becomes visible when focused (for example, by pressing Tab on the keyboard). 

Color contrast 

We used the WebAIM Contrast Checker and Siteimprove Accessibility Checker to review and adjust color contrast on our site. These tools helped us identify text and background color combinations that didn’t meet accessibility standards. Our goal was to ensure a contrast ratio above 6.0 across the site, which goes beyond the WCAG AA requirement (4.5:1) and moves toward AAA-level readability. 

##Accessibility in home page 

The home page uses semantic HTML elements such as <header>, <nav>, <main>, and <footer> to support screen reader navigation and logical page structure.  
Product cards include clear headings and structured content for easy comprehension. "Shop" link is clearly labeled without redundant ARIA attributes.  
 
##Accessibility in shop 

In the shop there are three levels of headings h1-h3. There is also a section where you can browse products by category. In that section nav- and a-tags with aria-labels are used to tell users what links are for:  

`<a href="/allproducts/findbycategory/?category=phone" aria-label="Phones">Phones</a> `
 
All the images have an alt-attribute which comes from database: 

`<img src="{{this.imageUrl}}" alt="{{this.name}}" class="product-image"> `
 
Colors and layout are consistent with admin-panels product listing. 
Headers and content of product cards can be accessed with h- and arrow-keys, links with tab. 

##Accessibility in admin login page 

Visual and semantic page heading 

There is a banner image (logadmin.png) on the login page as the visual title of the page. Because screen readers cannot interpret visual meaning, hidden <h1> element was added at the top of the page: 

`<h1 class="visually-hidden">Admin Login</h1> 
<img src="/images/adminlogin_logo.png" alt="" aria-hidden="true" class="login-page-banner"> `

This means that the sighted users see a styled image as the page heading while screen reader users detect a proper heading element. The image itself is marked with aria-hidden="true" and an empty alt attribute to make sure assistive technologies skip it. 

Proper labeling of form fields 

All input fields (username and password) are explicitly associated with labels, even if the labels are visually hidden: 

`<label for="username" class="visually-hidden">Username</label> 
<input id="username" name="username" ...> 

<label for="password" class="visually-hidden">Password</label> 
<input id="password" name="password" ...> `

This ensures that the screen readers can announce the input’s purpose correctly. Even though placeholder text is present, relying on placeholders alone is not sufficient for accessibility which is why proper <label> elements are included. 

Input icons marked decorative 

In our login form, we added small icons (like file and lock icons) inside the input fields. Because they are only decorative and don’t give important information, we added aria-hidden="true" and left out the alt text. This way, screen readers skip them and don’t read anything unnecessary. 

`<img src="/images/locklogo.png" alt="" aria-hidden="true" class="input-icon-inside">`

##Accessibility in admin page 

Visual and semantic page heading 

The admin page uses an image (admin_panel.png) as the visual title. To ensure that screen reader users also receive a correctly structured heading, a visually hidden <h1> was added at the top of the page: 

`<h1 class="visually-hidden">Admin Panel</h1> 

<img src="/images/admin_panel.png" alt="" aria-hidden="true" class="admin-image"> `
 
The image is marked as decorative with aria-hidden=”true” and an empty alt attribute to make sure assistive technologies skip it. 

Form accessibility 

The form for adding new products includes several fields (name, price, category, image, stock availability)- Each field is labeled properly even if some of the labels are visually hidden. This guarantees that screen readers can announce each field’s purpose.  

`<label for="name" class="visually-hidden">Product name</label> 
<input id="name" name="name" type="text" placeholder="Product name" required> 

<label for="price" class="visually-hidden">Price</label> 
<input id="price" name="price" type="number" placeholder="Price" required> `
 
For the category <select> we use an aria-label to provide a meaningful description: 

`<select id="category" name="category" required aria-label="Choose product category"> `
  `<option value="">Choose a category</option>`
  ... 
`</select>`
 
The file upload and checkbox are labeled visibly for clarity: 

`<label for="productImage" class="file-label">Product image</label> 
<label for="inStock">Available in stock</label> `
 
Product list and actions 

Below the form the page displays a list of products. Each product is inside an <article> element and uses aria-labelledby to associate the container with the product’s name: 

`<article class="product-card" aria-labelledby="product-0"> `
 ` <h3 id="product-0">Product Name</h3>` 
 
This allows screen reader users to quickly identify each item. Action buttons such as Edit and Delete have aria-labels that describe their purpose: 

`<a href="/admin/edit/..." aria-label="Edit product Product Name">Edit</a> `
`<button aria-label="Delete product Product Name">Delete</button> `

Stats 

Pixel Heart Stats Box, KuvaFor sighted users, it’s easy to visually associate the Pixel Heart button in the header with the Stats Pixel Heart image, but for users with visual impairments, this connection is explained more clearly through accessible text. The heart icon includes a descriptive alt text ("Pixel Heart"), and additional context is provided via visually hidden text: 
 
 `<p class="visually-hidden">This shows how many times the heart button has been pressed.</p>` 
 
This ensures screen reader users also understand the purpose of the stats without adding visual clutter. 
 
##Accessibility in Contact page 

The contact page uses clear structure and accessibility features to help all users, including those using screen readers or keyboards. The main section has a heading connected with aria-labelledby="contact-title", making it easier to understand the page layout. 

`<div class="contact-container" role="region" aria-labelledby="contact-title">` 
`<h1 class="contact-title" id="contact-title" >Contact Us</h1>` 
 
Success and error messages are announced automatically using role="status" and role="alert", so users get feedback right away. All form fields have hidden labels for screen reader users, while placeholders help sighted users. Required fields ensure proper form submission for everyone. 

    `<label for="name" class="visually-hidden">Name</label> `
    `<input id="name" name="name" placeholder="Name" type="text" required value="{{formData.name}}">` 
 
The contact section groups information like email and social media using role="group" and descriptive aria-labels. Icons are marked as decorative with aria-hidden="true" so they don’t distract assistive technology. 

##Accessibility in 404 page 

The 404 page uses clear semantic structure with a heading (<h1>) to inform users of the error. The animated element includes role and a descriptive aria-label, making the visual content accessible to screen reader users.  

` role="img" ` 

`aria-label="Animated purple pixel creature jumps across 404 numbers and cacti, hitting boxes that release coins, in a retro game style." `
 
The “Home” link uses aria-label="Go to Homepage" for clarity and role="button" to communicate its interactive nature visually and semantically. These enhancements help both screen reader users and keyboard navigators understand the page’s purpose more easily. 

##Evaluation tools 

To test the accessibility of our project, we used the following tools: 
WAVE Evaluation Tool (Chrome extension) 
Siteimprove Accessibility Checker (Mozilla Firefox extension) 
NVDA screen reader 
Keyboard navigation 
WebAIM Contrast Checker 

We used the WAVE browser extension from WebAIM to scan our pages and detect accessibility issues. It helped us find missing labels and problems with color contrast. For example, WAVE pointed out input fields that were missing proper <label> elements, which we then added (visually hidden but screen reader accessible). It also revealed contrast issues between text and background, which we fixed by adjusting the color combinations. 
For checking color contrast more precisely we used the WebAIM Contrast Checker. It allowed us to test text color and background color combinations manually and make sure they met at least WCAG AA contrast standards. 
Siteimprove Accessibility Checker helped us identify incorrect or unnecessary ARIA attributes, missing alt texts, and mismatched labels. It also provided suggestions for meeting the AAA standard. For example, it alerted us when aria-labelledby was used incorrectly on non-semantic elements, which led us to simplify the structure and remove unnecessary roles. It also helped us align visible labels with accessible names. To fully meet WCAG AAA standards, we would need to make header links at least 45x45 pixels, use larger and relative font sizes, and increase some color contrasts to a ratio above 7.0. 
We also used the NVDA screen reader to test keyboard navigation and how the site content is announced to visually impaired users. We checked that all interactive elements were reachable with the keyboard, form fields had proper labels, and headings were read in a meaningful order. 

##GitHub and Azure 

UI design and laout planning was done in Figma: https://github.com/Backendarit/PixelPop/blob/main/accessibility.md 
Live site: https://pixelpop.azurewebsites.net/ 

##Responsibilities 

Heli was responsible for the Shop page’s product listing with different categories, admin page’s update-form for products and footer. 
Henna-Riina was responsible for implementing accessibility features in the Admin login page (including form accessibility, heading structure and decorative input icons with proper aria attributes), Admin page (including the “Add new product” form and the product list. She also made the skip to main content button and implemented custom focus outlines for keyboard users. 
Maisa was responsible for implementing accessibility in the Header, Home page, Contact page, 404 page, the Stats section on the Admin page and optimized the keyboard focus indicators. 
