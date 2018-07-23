# ACF Untappd Beer Picker Field (ACF v5)

This is a custom field for ACF (version 5.6.0 or later only) which adds an AJAX-powered Untappd Beer Picker.

It uses Select2's [AJAX functionality](https://select2.org/data-sources/ajax) on search to grab 5 beers from the Untappd API
and displays them as options. Once selected, the selected Beer's ID is saved to the database for later use as you see fit.
On field init, if there is a value saved, it grabs the selected beer from the API to display a friendly name (Brewery Name & Beer Name).  

## Requirements
 - ACF Pro v5.6.0+ (Select2 v4 is required and was made default in this update)
 - PHP 7+ (not actually, but don't be _that_ person)
 - [Untappd App API Keys](https://untappd.com/api/dashboard) (Client ID and Client Secret)
 
## Installation
`composer require craftpeak/acf-untappd-beer`

(or do it the old fashioned way, I guess)

## Setup
The field REQUIRES the Untappd Keys, and will not work without them. You can provide them one of two ways:
 - Enter them into the field's settings (when you add it to the field group)
 - Provide 2 constants in your `wp-config.php` (or if you're using Bedrock you can put the keys in your `.env`,
 with proper hookup code in your `application.php` file):
```php
// Untappd API Keys
define('UNTAPPD_CLIENT_ID', 'xxxxxxxxxxxx');
define('UNTAPPD_CLIENT_SECRET', 'xxxxxxxxxxxx');
```
