// Override setButtonNav function.
Object.defineProperty(window, 'setButtonNav', {
  value: function (oRadio) {
    console.debug('Custom setButtonNav.');
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

// Resolves errors related to setAttribute use within the page.
CSSStyleDeclaration.prototype.setAttribute = function (key, value) {
  this[key] = value;
}

// Override nextStep function.
Object.defineProperty(window, 'nextStep', {
  value: function (id) {
    console.debug('Custom nextStep.')
    if (validate(id) == false) { return false; }
    alltabs = subTabs.obj.children[0].childNodes;
    
    for (var a = 0; a < alltabs.length; a++)
    {
      if (alltabs[a].ref == id) { otab = alltabs[a]; }
    }
    
    if ((id == "Step 3" && document.submissionBuild.recipientType[0].checked == true) || id == "Submit") {
      for (var i=0; i < document.submissionBuild.emailAttachments.length; i++)
        document.submissionBuild.emailAttachments.options[i].selected = true;
      for (var i=0; i < document.submissionBuild.emailBody.length; i++)
        document.submissionBuild.emailBody.options[i].selected = true;
      for (var i=0; i < document.submissionBuild.emailStitch.length; i++)
        document.submissionBuild.emailStitch.options[i].selected = true;

      document.getElementById('emailAttachmentsFileNames').value = setFileName(document.getElementById('emailAttachments'));
      document.getElementById('emailBodyFileNames').value = setFileName(document.getElementById('emailBody'));
      document.getElementById('emailStitchFileNames').value = setFileName(document.getElementById('emailStitch'));
      
      document.submissionBuild.submit();
    } else { 
      subTabs.tabEnable(otab);
      subTabs.tabSwitch(otab.ref);
    }
  }
});