# EventListener

## Welcome to EventListener! 
  A Social media platform that provides users with an interactive map and visual representation of their events as well as their friends' events.

## USER STORY:
  Upon loading the app, a user will see a home screen that prompts the user to log in or sign up. If the user has not created an account, they will then click sign up and fill out a form which, upon submit will send the user’s form data to the database and create the user. (I hope to implement Facebook OAuth, in which case the user will log in with Facebook and they will be required to give access to their calendar events.) Once the user has an account, they can log in. 

  After logging into their account they will be brought to the main map / home page. There will be a nav rendered at the top left of every page. If the user has any events, they will be rendered on the map using the user's icon or avatar for the default time range (1 week). If the user has any friends on EventListener, they will be able to then see their friends avatars on the map, which again represent events during the given date range. 

  The user can click on the avatars and when clicked, a sidebar will appear with the details about the event, a button to go to the event page, and a button to start a chat with that friend. The user can click to go to the show page and, if the event is public, add it to their events, if they would like.

  The Nav bar will give you the option to search for users and when selected a modal or sidebar will display that user’s profile allowing you to add them as a friend. 

  There will also be a button linking to the current user’s profile, which will show the user’s name, friends, and events (calendar or chronological list). A user can directly create/edit/update/delete events from the user profile page as well as remove friends.
   The Nav will also let a user view and select their friends to filter their map events for only the selected friends. It will also let the user change the range of dates for which events are rendered on the map.
 
## ERD (ENTITY RELATIONSHIP DIAGRAM)

  https://www.lucidchart.com/invitations/accept/4245c60e-c11e-43a6-b301-cfce03f76771

## WIREFRAME

  *components are listed in the comments on each page*
  https://www.fluidui.com/editor/live/comment/cF9zOG1JeE9kd1FvYUhVV1R3OGlVRHhJYzdyNGJONmR3cQ==

### APP STATE

  APP Component state = {
    loggedIn: boolean,
    currentUser: userObj || {},
    store = StoreState
  }
  
  Login/SignUp Component State = {
    loggedIn: false,
    username: "",
    password: ""
  }
  
  Home Page Component state = {
    startDate: Date.now,
    endDate: Date.new([]),
    selectedUsers: []
  }
  
  
  
  







