# cipher-font

## Usage

``` javascript
var cipher = require('cipher-font');

cipher(
    'path/to/source_font.otf',
    'path/to/output_font.otf',
    'optional seed string'
)
.then((cipherMapping) => {
    // the mapping is an object where
    // characters map as keys to ciphered characters
    
    console.log('A is now ' + cipherMapping['A'] + '!');
});
```

When you've ciphered your string, use the generated font to render it. The user should see the original text, but a scrape of the text will still read as ciphered.

Obviously this is not incredibly secure (it's the most basic of cryptography), but it's about as advanced as I think I can take this concept unless I have a better idea, and it should fool most bots which aren't really looking for it.

Or maybe you have more prank-related ideas? I'm not saying you should set your friend's default editor font to a generated font, only that it's a possibility which may send him digging into his keyboard language settings to figure out why the wrong letters are coming out.

## Mapped Characters

The library currently just maps any characters in the following string:

``` javascript
' .?!,:;abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
```