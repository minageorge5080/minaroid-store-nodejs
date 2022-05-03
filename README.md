Image Processing Api
===========================

- A simple placeholder API, the first allows you to place images into your frontend with the size set via URL parameters or rapid prototyping.
- Serve properly scaled versions of your images to the front end to reduce page load size. Rather than needing to resize and upload multiple copies of the same image to be used throughout your site.

Installation 
===========================
- Create ````.env```` file in project root folder.
- Add SERVER_PORT=SERVER-PORT to ````.env```` file.
- Run ````npm install```` to download project dependencies. 
- For developemnt ````npm run develop```` .
- For compile & run  ````npm run start```` .
- For run test cases  ````npm run test```` .

Testing
===========================
- http://localhost:(SERVER-PORT)/public/images/thumbnail/(FULL-IMAGE-NAME)?width=500&height=600
- Use ````test-image.html``` file for preview and generate new sizes.
- To test other images add them to ````public/images/full````

