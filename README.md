# TIMBER OBSERVER

Timber Observer is an Angular application for learning project at SoftUni.bg. Timber Observer accesses, synthesizes and processes data of the Forestry Executive Agency and the Commission for Financial Supervision in the Republic of Bulgaria for the logging and transportation of timber

## Resources

Timber Observer uses Firebase for data storage in RealTime Database and authentication. Pure CSS and partially ngBootstrap were used for the design. OpenLayers is used for map creation and coordinates handling. Public API of GeoNames.org is used for geographic data.


## Application Structure and Actions

Public Part (accessible without authentication)
- Home Page
- Observer Page
- Login Page
- Register Page
- Modals of Tickets (insurance check part is accessible with authentication)
- Modals of Reports
  
Private Part (accessible with authentication)
- Report Forest Violation Page
- Edit Report Page (for author of the report)
- Profile Page with edit and search functionality
- Logout function
- Delete Report Violation function (for author of the report)
  
All forms have added validation to prevent sending incorrect data.


