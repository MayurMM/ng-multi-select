ng-multi-select
===================

A custom multi select type ahead drop down list directive for AngularJS.

This directive allows to select multiple item from dropdown list. It has in built functionality to query local and remote dataset. 
It also allows to create list of values dynamically. By default it will display dropdown as list of span element with text. You have option to customize list item by using ta-item-template.

# Demo

View the demo on : http://ng.mmapp.us/ng-multi-select

# Installation

### Bower
```bash
$ bower install ng-multi-select
```

### Manual
```bash
1. $ git clone https://github.com/MayurMM/ng-multi-select.git
2. <script src="path/to/ng-multi-select/dist/ng-multi-select.min.js">
3. <link rel="stylesheet" href="path/to/ng-multi-select/dist/ng-multi-select.min.css">
4. Add module ng-multi-select to dependencies list
```

# Usage

### local data and selection of array object implementation
```html
<ta-drop-down
        ta-items="items"
        ta-name="itemName"
        selected-items="selected"
></ta-drop-down>
```
```html

### remote search via api implentation
this configuration allow you to searchitem remotely based on search term and results will be returns to items object. you can also define custom via ng-temmplate and it will update list item based on template.
<ta-drop-down
        ta-items="values"
        ta-label="Item"
        ta-default-items="values"
        ta-name="itemName"
        ta-item-template="templateName"
        search = "searchItem(term)"
        selected-items="selected"
>
</ta-drop-down>
``` html