// Udacity feed reader using jasmine

$(function() {

    describe('RSS Feeds', function() {
        
        /* 1- This firs example was given by Udacity */

        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* 2- Used the 'for...of' loop to iterate over allFeeds elements checking if the url(key value pair) is defined, it's type and if it's has an actual content (not a empty string) */

        it('each has url', function() {
          for(let el of allFeeds) {
            expect(el.url).toBeDefined();    
            expect(typeof(el.url)).toBe('string');            
            expect(el.url.length).not.toBe(0);
          }       
        })

        /* 3 - In this test I've used the same concept as above, but now using the .name property */
        it('each has name', function() {
          for(let el of allFeeds) {
            expect(el.name).toBeDefined();
            expect(typeof(el.name)).toBe('string');
            expect(el.name.length).not.toBe(0);
          }       
        })
    });

    /* This suite checks if the menu exists and if it changes when the user interact with the button
    on the upper left side */
    describe('The menu', () => {
      const body = document.body;

      /* 1- Check if the body is loaded with a class that hiddens the menu */

      it('default is hidden', () => {            
        expect(body.classList.contains('menu-hidden')).toBe(true);
      })

      /* 2- Checks if the user interaction with the menu button makes the menu visible (and vise-versa) */        

      it('is visible when clicked', () => {
        const menuBtn = document.querySelector('.menu-icon-link');
        menuBtn.click(); 
        expect(body.classList.contains('menu-hidden')).toBe(false);
        menuBtn.click();    
        expect(body.classList.contains('menu-hidden')).toBe(true);
      })
    })
    
    /* This suite checks the success when the user try to change the feed on the menu bar */
    
    describe('Initial Entries', ()=>{

      /* 1 - Set a test to run before following tests. 
      Here I've set the id to one, in order to chcek if the feed changed (since the default is 0) 
      and done as a callback to indicate when the action ended (so we can run other tests)*/
  
      beforeEach((done) => {
        loadFeed(1, done);            
      })  
      
      /* 2 - After checking if the feed was changed (0 to 1) I've checked if the new feed container (index 1 on the loadFeed) 
      has at least one element (class .entry) inside of it */
      it('has entries', ()=> {
        const feed = document.querySelector('.feed .entry');
        expect(feed.hasChildNodes()).toBe(true);
      })  
    })


    /* This suit checks if the "new feed" has a content tha is different from the "previous feed" */    
    describe('New Feed Selection', () => {
    
    /* 1- Set variables to hold content */
    
    let oldfeed, newfeed;

      /* 2- Here I've run a loadFeed call to store the content of each feed inside the variables in the outer scope */
    
      beforeEach((done) => {
        loadFeed(1, ()=> {
          oldfeed = document.querySelector('.feed').textContent;
          /* the second loadFeed needs to be executed inside the first one, because in this case we will run the function done()
          as a callback after all so it's necessary to go into both feeds and extract the values(content) to store them */
          loadFeed(2, () => {
              newfeed = document.querySelector('.feed').textContent;
              done();
          })
        })      
      })

      /* 3- And finally Iv'e checked if the content inside the 'oldfeed' matches the one inside 'new feed' */
      it('load new feed', () => {
        expect(oldfeed).not.toMatch(newfeed);
      })
    })
        
}());
