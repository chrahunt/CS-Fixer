function processResultsTable(index, element) {
  // Only applies to the first three resultsTables retrieved.
  if (index <= 3) {
    var results = $('table.results', element);
    // Table present means there are entries in the history.
    if (results.length == 1) {
      var table = results.get(0);
      // Get the links meant to be associated with the rows.
      var links = $('tbody>tr>td>a', element);
      var rows = $('tr', results).not(':first');
      // One link for each row
      if (links.length == rows.length) {
        var linkArray = links.toArray();

        rows.each(function(i, elt) {
          $(elt).click(function() {
            window.location = linkArray[i]['href'];
          });
        });
      } else {
        console.error("Number of links and rows do not match.");
      }
    }
  }
}

console.debug("Contingent Staffing Fixer");

/* Get tables with id resultsTable */
var tables = $('body #resultsTable');

if (tables.length < 3) {
  console.error("Results table list shorter than expected. Discontinuing.")
  console.debug("Results table list size: " + tables.length);
  console.debug("Page: " + document.location);
} else {
  tables.each(processResultsTable);
}