/*
* subscription_overview_template.js
*/

/*
Example:
<div class="subscription-overview"><strong class="day-bangumi-count">6</strong><a class="subscription-edit" href="javascript:"><i class="icon-edit"></i></a><a class="subscription-add" href="javascript:"><i class="icon-plus"></i></a></div>
*/

module.exports = [
    '<div class="subscription-overview"><strong class="day-bangumi-count"><%= count %></strong><a class="subscription-edit" href="javascript:"><i class="icon-trash"></i></a><a class="subscription-add" href="javascript:"><i class="icon-plus"></i></a></div>'
].join("");
