# Space-Themed Birthday Website

A beautiful, interactive website to celebrate someone's birthday with a space theme. Features include:

- Animated space background with stars and nebulae
- Happy birthday message with animations
- Interactive photo gallery with personal messages
- Birthday countdown timer
- Animated birthday cake with blowable candle
- Confetti animation when blowing out the candle

## How to Use

1. Open `index.html` in any modern web browser.
2. Navigate through the sections using the buttons at the bottom of each section.
3. In the gallery section, use the arrow buttons to navigate through photos and their messages.
4. In the cake section, click the "Blow Candle" button to blow out the candle and trigger the confetti animation.

## Customization

### To add your own photos and messages:

1. Open `script.js`
2. Find the `photoData` array (around line 30)
3. Replace the sample URLs with your own image URLs
4. Update the messages to your personalized birthday wishes

### To change the birthday date for the countdown timer:

1. Open `script.js`
2. Find the `initTimer` function (around line 130)
3. Update the date in `new Date(now.getFullYear(), 0, 1)` where:
   - First parameter is the year (current year by default)
   - Second parameter is the month (0 = January, 1 = February, etc.)
   - Third parameter is the day of the month

## Technologies Used

- HTML5
- CSS3 (with animations and transitions)
- JavaScript (vanilla, no frameworks)

Enjoy and happy birthday! 🎂🎉 