Getting started with JrkDynamicPopupBundle
==========================================

Setup
-----
JrkDynamicPopupBundle is a dynamic popup manager for Symfony2


- Using composer

Add `jrk/dynamicpopup-bundle` as a dependency in your project's composer.json file:

```
{
    "require": {
        "jrk/dynamicpopup-bundle": "dev-master"
    }
}
```
Update composer
```
php composer update
or 
php composer.phar update
```

- Add JrkDynamicPopupBundle to your application kernel

``` php
<?php
// app/AppKernel.php

public function registerBundles()
{
    $bundles = array(
        // ...
        new Jrk\DynamicPopupBundle\JrkDynamicPopupBundle(),
    );
}
```


Installation & Configuration
----------------------------

- 1. Add bundle's name in your app/config/config.yml
```
# app/config/config.yml

assetic:
   bundles: [ JrkDynamicPopupBundle ]
```

- 2. Execute the following command:
```
 php app/console assets:install
```


- 3. Include css files:

```
 {{ dynamic_popup_styles() }}
```

- 4. Include js files:

```
 {{ dynamic_popup_javascripts() }}
```

- 5. Add just after the &lt;body> tag

```
 {{ dynamic_popup_template() }}
```

You can override two things:
- The ajax gif icon for ajax call (`ajaxAsset`)
- The js doT template (`popupTemplate`)

Here is an example:

```
 {{ dynamic_popup_template({ ajaxAsset: 'img/ajax-loader.gif', popupTemplate: 'MyBundle:Acme:my-custom-doT-template.html.twig' }) }}
```



Usage
-----
We're assuming you have jquery in your project

- modalInformation(data, fancyboxOptions) => // Display a simple popup
- data: an object with 5 keys
    - title: popup's title
    - message: popup's message
    - close: popup's close button label
    - dataTitle: a list of injected dynamic variables into title
    - dataMessage: a list of injected dynamic variables into message
- fancyboxOptions: extend fancybox options

``` js
modalInformation({
    title: 'Popup title',
    message: 'Popup body',
    close: 'Close'
}, {
    minWidth: 320
});
```

- modalInformation(data, fancyboxOptions, __this__) => // Display a dynamic choice popup
- data: an object with 5 keys
    - title: popup's title
    - message: popup's message
    - choices: a list of button (label, action, url, buttonClass)
    - dataTitle: a list of injected dynamic variables into title
    - dataMessage: a list of injected dynamic variables into message
- fancyboxOptions: extend fancybox options
- __this__: save a "this" reference

``` js
$('a.clickme').function() {
    modalChoices({
        title: 'Popup title',
        message: 'Popup body : <strong>{{=it.classname}}</strong>',
        choices: [
            {label: 'Yes', action: 'doSomething(__this__)', buttonClass: 'btn btn-primary'},
            {label: 'No', action: '$.fancybox.close()', url:true, buttonClass: 'btn btn-danger'},
            {label: 'Help', url: 'http://www.some-help-website.com', target:'_blank', buttonClass: 'btn btn-info'},
        ],
        dataMessage: {
            classname: 'Hello World (from a variable) !'
        }
    }, null, $(this));
}

function doSomething(myThisReference) {
    // myThisReference is a reference of 'a.clickme' DOM Element
    ...
}
```

There are two other options for both `modalInformation` and `modalChoices`.
In fact, these two options are useful only for `modalChoices`.
This is two examples:

``` js
 modalChoices({
     ...
     input: {
        placeholder: 'Email address',
        type: 'text'
     }
     ...
 });

 modalChoices({
     ...
     select: {
        name: 'favorite-color',
        id: 'my-select-id',
        choices: [
            {value:'#FF0000', label:'Red'},
            {value:'#00FF00', label:'Green'},
            {value:'#0000FF', label:'Blue'}
        ]
     }
     ...
 });
```

Get data from &lt;input> or &lt;select> by calling that function:

``` js
 var formField = getModalFieldElement();
```


