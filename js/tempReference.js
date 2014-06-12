function processReferenceChecksTable(element) {
  // Get the links meant to be associated with the rows.
  var links = element.children('a');
  var rows = $('tr', element);
  // One link for each content row
  if (rows.length > 2) {
    if (links.length == (rows.length - 2)) {
      var linkArray = links.toArray();

      rows.each(function(i, elt) {
        if (i > 1) {
          $(elt).click(function() {
            window.location = linkArray[i - 2]['href'];
          });
        }
      });
    } else {
      console.error("Number of links and rows do not match.");
    }
  } else {
    console.log("No reference checks!");
  }
}

console.debug("Contingent Staffing Fixer");

// Get 'Reference Checks' table.
var container = $('#ext-gen6 > table > tbody > tr:nth-child(3) > td');

if (container.length === 0) {
  console.error("Results table list shorter than expected. Discontinuing.")
  console.debug("Results table list size: " + tables.length);
  console.debug("Page: " + document.location);
} else {
  processReferenceChecksTable(container);
}