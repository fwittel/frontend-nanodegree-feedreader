 // Jasmine spec file with tests

// Use jQuery to wait for DOM to be loaded
$(function() {
    // Test suite for RSS feed definitions and variables (allFeeds, its urls and names)
    describe('RSS Feeds', function() {
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        it('their urls are defined', function () {
            for (let feed of allFeeds) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).toBeGreaterThan(0);
            }
        });

        it('their names are defined', function () {
            for (let feed of allFeeds) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).toBeGreaterThan(0);
            }
        });
    });

    // Test suite to test the menu (including its HTML class changes to make it visible and hide it)
    describe('The menu', function() {
        it('is hidden by default', function() {
            expect(document.querySelector('body')).toHaveClass('menu-hidden')
        });

        it('changes visibility when the menu icon is clicked', function() {
            document.querySelector('.menu-icon-link').click();
            expect(document.querySelector('body')).not.toHaveClass('menu-hidden');
            document.querySelector('.menu-icon-link').click();
            expect(document.querySelector('body')).toHaveClass('menu-hidden');
        });
    });

    // Test suite to check whether initial entries are loaded (using asynchronous functions)
    describe('Initial Entries', function() {
        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });

        it('do exist', function() {
            expect(document.querySelectorAll(".feed .entry").length).toBeGreaterThan(0);
        });
    });

    // Test suite to check whether changing the source feed actually resonates in an updated HTML
    // Most complicated one so a bit more extensive comments here
    describe('New Feed Selection', function() {
        // Get random feeds
        const feedId1 = Math.floor(allFeeds.length * Math.random());
        const feedId2 = (feedId1 + 2) % allFeeds.length;

        // Create variables to save the labes so we can access them here
        let feedLabel1 = "";
        let feedLabel2 = ".";

        // Load first feed
        beforeEach(function(done) {
            loadFeed(feedId1, function() {
                // Save first feed's label
                feedLabel1 = document.querySelector('.header-title').innerHTML;
                // Load second feed
                loadFeed(feedId2, function() {
                    // Save second feed's label
                    feedLabel2 = document.querySelector('.header-title').innerHTML;
                    done();
                });                    
            });
        });

        // Compare the two labels
        it('works', function() {
            expect(feedLabel1).not.toEqual(feedLabel2);
        });
    });
}());
