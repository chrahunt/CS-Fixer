// Override setButtonNav function.
Object.defineProperty(window, 'setButtonNav', {
  value: function (oRadio) {
    console.debug('Custom setButtonNav');
    if (oRadio.value == 1) {
      document.getElementById('btnStep2').value='Send To Account Mgr.';
      document.getElementById('btnStep2').onclick = function () { nextStep('Step 3');}
      var alltabs = subTabs.obj.children[0].childNodes;
      if (arguments.length == 2 ) {
        tabCheck();
        document.submissionBuild.recipientType[1].checked = true;
        setButtonNav(document.submissionBuild.recipientType[1]);
      } else {
        subTabs.tabDisable(alltabs[2]);
        subTabs.tabDisable(alltabs[3]);
      }
    } else if (oRadio.value == 99) {  /* rebuild */
      document.getElementById('btnStep2').value='Send To Account Mgr.';
      document.getElementById('btnStep2').onclick = function () { nextStep('Step 3');}
      var alltabs = subTabs.obj.firstChild.childNodes;
      document.submissionBuild.recipientType[0].checked = true;
    } else {
      document.getElementById('btnStep2').value='Proceed to Step 3'; 
      document.getElementById('btnStep2').onclick = function () { nextStep('Step 3');}
      if (arguments.length == 2 ) {
        tabCheck();
      }
    }
  }
});