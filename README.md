# blog

I have created this React+Node(Express)+Docker App for Learning Purpose.

Features of the app:
 - User can create Post
 - User can add comment to Post
 - If user adds some explicit comment ( Demo -'orange' ) , then moderation service will flag that
 - All Microservice connects using Event-Bus
 - After any event occur, every service Echo the event to Event-Bus
 which afterwards Echo the same event to each servide for their use.
 - If some service is added in Future or it crashes , it can take data from Event-Bus i.e. All Services are in Sync.

Update 1/n:
 - Added Docker support in Application
 - Must have Install the Docker CLI and run the Docker Daemon before using docker


Steps to Use:
 - Clone 'Blog'
 - In each Sub Folder (client i.e UI and microservice ) => Run "npm install"
 - Run all services and client too using "npm start"
 - Use the UI in browser.

Steps to Use with Docker:
- Clone 'Blog'
- In each folder open a terminal
- Make sure docker is installed and running
- run "docker build ."
- Use the "image-id" from build and
- Run "docker run {image-id}"