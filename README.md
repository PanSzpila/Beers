# Beers

Fake site when user can search for interesting beers and view details.

Based on:
- HTML, CSS, JavaScript, of course.
- React with functional components with hooks
    - own components as well as component imported via npm
    - react router
- bootstrap
- custom SCSS (sass)
    - variables
    - functions
- REST API integration
    - filtering items, showing details

To do at first:
- completely diferent theme
- details of product
- brief information about project in "about" page


Known Issues (starting from most important):
CSS:
- Hamburger menu on navbar does'n work (back in the days there was probably some conflict in .navbar-collapse class, but now I can't find it).
- pagination border-radius to small (should be 0,7 like everywhere else ($mainBorderRadius in custom.css:16)
- "bird symbol" in shop, "items on page" is dark, should be $lightGrey, but there is no class where i can change it).
