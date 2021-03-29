
	var globalSuccessValues = '';

function GetProductDetailsFromIndesignFile(productData) {
	////alert('GetProductDetailsFromIndesignFile'+productData);
	var wholeProductFromInDesign = [];
	var stringReturnValue = '';
	var errorReturnValue = '';
	var warningReturnValue = '';
	try {

		
		var productStatus = 101;
		/// 101 -> Product In Success,
		/// 102 -> Product In Warning,
		/// 103 -> Product In Error,

		if (productData == null || productData == '' || productData == undefined) {
			////alert('There is no product details!');
			return errorReturnValue;
		}
		////alert( 'GetProductDetailsFromIndesignFile--- in jsx productData.length-'+productData.length);
		////return 'this is the message from getMessageFromUtil';

		/////////////////////////////////GROUP START//////////////////////////////////////////////////////
		//set active document.
		var myDoc = app.activeDocument;
		//probably the same thing....
		var curDoc = app.documents[0];
		//Get pages 
		var allPages = curDoc.pages;
		if( allPages.length == 0)
		{
			errorReturnValue = "There is no pages";
		}
		var isItaNewPageForError = false;
		var isItaNewPageForWarning = false;
		var isItaNewPageForSucess = false;
		var pageName = '';
		////alert('Total pages-'+allPages.length);
		for (var p = 0; p < allPages.length; p++) {
			/*
			if(p > 0)
			{
				continue;
			}
			*/
			////alert('page name '+ allPages[p].name);
			isItaNewPageForError = true;
			isItaNewPageForWarning = true;
			isItaNewPageForSucess = true;
			currentPage = allPages[p];
			pageName = currentPage.name;
			/*
			if(pageName != '165')
			{
				return;
			}
			*/
			////	var pages = app.documents[0].pages;
		////	var pg = app.activeDocument.pages[0];
			///alert('pg.name-'+pageName);


			var groups = currentPage.groups;
			////var tf_ingroup_counter = 0;
			///alert('pageName-'+pageName+'Group length-' + groups.length);

			var newTextForIndesign = '';
		
			for (var g = 0; g < groups.length; g++) {
				var grp = groups[g];
				//////////////////////////////Group Within Group////////////////////////////////////////////////
			
				var innerGrps = grp.groups;
				for (var t1 = 0; t1 < innerGrps.length; t1++) {
					var innerGrp = innerGrps[t1];
					for (var t2 = 0; t2 < innerGrp.textFrames.length; t2++) {
						var tff2 = innerGrp.textFrames[t2];
						var pdtFromInDesign = tff2.contents;
						////alert('pdtFromInDesign '+pdtFromInDesign+'Within Group');
						if (pdtFromInDesign != null && pdtFromInDesign != ''
							&& pdtFromInDesign != undefined 
							&& pdtFromInDesign.indexOf('[') > -1) {

							productStatus = 101;//success
							/////alert(pageName+' ---->'+pdtFromInDesign);		
							for (var pdt = 0; pdt < productData.length; pdt++) {
								try 
								{
									newTextForIndesign = '';
									var pdtFromAppData = productData[pdt].Product;
									var weightFromAppData = productData[pdt].Weight;
									var rateFromAppData = productData[pdt].Price;
									var lengthFromAppData = productData[pdt].Length;
									if (pdtFromInDesign != null && pdtFromInDesign != ''
										&& pdtFromInDesign != undefined && pdtFromInDesign.indexOf(pdtFromAppData) > -1) {
										
																	
										if (pdtFromInDesign.indexOf(']g') == -1
											|| pdtFromInDesign.indexOf('$[') == -1) {
											productStatus = 103;		/// 103 -> Product In Error,
											wholeProductFromInDesign.push(
												{
													'PageName': pageName,
													'Product': pdtFromInDesign,
													'IsError': true,
													'IsWarning': false,
													'Status': Status,
													'IsItaNewPage': isItaNewPageForError
												});


											if (errorReturnValue.length == 0) {
												errorReturnValue += (isItaNewPageForError ? "1" : "0") + 'C12L' + pageName + 'C12L' + pdtFromInDesign + "C12L1C12L0C12LGG";
											}
											else {
												errorReturnValue += "R12W" + (isItaNewPageForError ? "1" : "0") + 'C12L' + pageName + 'C12L' + pdtFromInDesign + "C12L1C12L0C12LGG";
											}
											isItaNewPageForError = false;
											///alert(errorReturnValue);
										}

										break;
									} // found if close
									else {
										productStatus = 102;	/// 102 -> Product In Warning,
									}

									///alert('pdtFromInDesign-'+pdtFromInDesign+' | pdtFromAppData-'+pdtFromAppData+' | newTextForIndesign-'+newTextForIndesign);
								}
								catch (er) {
									alert('Group section-' + er);
								}

							} //productData loop closed


							if (productStatus == 102) //// Product missing 102 -> Product In Warning
							{
								wholeProductFromInDesign.push(
									{
										'PageName': pageName,
										'Product': pdtFromInDesign,
										'IsError': false,
										'IsWarning': true,
										'IsItaNewPage': isItaNewPageForWarning
									});
								if (warningReturnValue.length == 0) {
									warningReturnValue += (isItaNewPageForWarning ? "1" : "0") + 'C12L' + pageName + 'C12L' + pdtFromInDesign + "C12L0C12L1C12LGG";
								}
								else {
									warningReturnValue += "R12W" + (isItaNewPageForWarning ? "1" : "0") + 'C12L' + pageName + 'C12L' + pdtFromInDesign + "C12L0C12L1C12LGG";
								}
								isItaNewPageForWarning = false;

							}
							else if (productStatus == 101) /// 101 -> Product In Success,
							{
								wholeProductFromInDesign.push(
									{
										'PageName': pageName,
										'Product': pdtFromInDesign,
										'IsError': false,
										'IsWarning': true,
										'IsItaNewPage': isItaNewPageForSucess
									});
								if (sucessReturnValue.length == 0) {
									sucessReturnValue += (isItaNewPageForSucess ? "1" : "0") + 'C12L' + pageName + 'C12L' + pdtFromInDesign + "C12L0C12L1C12LGG";
								}
								else {
									sucessReturnValue += "R12W" + (isItaNewPageForSucess ? "1" : "0") + 'C12L' + pageName + 'C12L' + pdtFromInDesign + "C12L0C12L1C12LGG";
								}
								isItaNewPageForSucess = false;
							}

						}/// [ atleast one 
					}//innerGrp.textFrames.length
				}
//////////////////////////////Group Within Group End////////////////////////////////////////////////



/////////////////////////////////Groups //////////////////////////////////////////////////
				///	alert('group name '+grp);
				for (var t = 0; t < grp.textFrames.length; t++) {
					var tff = grp.textFrames[t];
					var pdtFromInDesign = tff.contents;
					if (pdtFromInDesign != null && pdtFromInDesign != ''
						&& pdtFromInDesign != undefined && pdtFromInDesign.indexOf('[') > -1) {

					
						productStatus = 101;//success
						///alert('grp '+pageName+' ---->'+pdtFromInDesign);
						for (var pdt = 0; pdt < productData.length; pdt++) {
							try {
								newTextForIndesign = '';
								var pdtFromAppData = productData[pdt].Product;
								var weightFromAppData = productData[pdt].Weight;
								var rateFromAppData = productData[pdt].Price;
								var lengthFromAppData = productData[pdt].Length;

								if (pdtFromInDesign != null && pdtFromInDesign != ''
									&& pdtFromInDesign != undefined && pdtFromInDesign.indexOf(pdtFromAppData) > -1) {
									

								
									if ( pdtFromInDesign.indexOf(']g') == -1
										|| pdtFromInDesign.indexOf('$[') == -1) {
										productStatus = 103;		/// 103 -> Product In Error,
										wholeProductFromInDesign.push(
											{
												'PageName': pageName,
												'Product': pdtFromInDesign,
												'IsError': true,
												'IsWarning': false,
												'Status': Status,
												'IsItaNewPage': isItaNewPageForError
											});


										if (errorReturnValue.length == 0) {
											errorReturnValue += (isItaNewPageForError ? "1" : "0") + 'C12L' + pageName + 'C12L' + pdtFromInDesign + "C12L1C12L0C12LG";
										}
										else {
											errorReturnValue += "R12W" + (isItaNewPageForError ? "1" : "0") + 'C12L' + pageName + 'C12L' + pdtFromInDesign + "C12L1C12L0C12LG";
										}
										isItaNewPageForError = false;
										///alert(errorReturnValue);
									}

									break;
								} // found if close
								else {
									productStatus = 102;	/// 102 -> Product In Warning,
								}

								///alert('pdtFromInDesign-'+pdtFromInDesign+' | pdtFromAppData-'+pdtFromAppData+' | newTextForIndesign-'+newTextForIndesign);
							}
							catch (er) {
								alert('Group section-' + er);
							}

						} //productData loop closed


						if (productStatus == 102) //// Product missing 102 -> Product In Warning
						{
							wholeProductFromInDesign.push(
								{
									'PageName': pageName,
									'Product': pdtFromInDesign,
									'IsError': false,
									'IsWarning': true,
									'IsItaNewPage': isItaNewPageForWarning
								});
							if (warningReturnValue.length == 0) {
								warningReturnValue += (isItaNewPageForWarning ? "1" : "0") + 'C12L' + pageName + 'C12L' + pdtFromInDesign + "C12L0C12L1C12LG";
							}
							else {
								warningReturnValue += "R12W" + (isItaNewPageForWarning ? "1" : "0") + 'C12L' + pageName + 'C12L' + pdtFromInDesign + "C12L0C12L1C12LG";
							}
							isItaNewPageForWarning = false;

						}
						else if (productStatus == 101) /// 101 -> Product In Success,
						{
							wholeProductFromInDesign.push(
								{
									'PageName': pageName,
									'Product': pdtFromInDesign,
									'IsError': false,
									'IsWarning': true,
									'IsItaNewPage': isItaNewPageForSucess
								});
							if (sucessReturnValue.length == 0) {
								sucessReturnValue += (isItaNewPageForSucess ? "1" : "0") + 'C12L' + pageName + 'C12L' + pdtFromInDesign + "C12L0C12L1C12LG";
							}
							else {
								sucessReturnValue += "R12W" + (isItaNewPageForSucess ? "1" : "0") + 'C12L' + pageName + 'C12L' + pdtFromInDesign + "C12L0C12L1C12LG";
							}
							isItaNewPageForSucess = false;
						}

					}/// [ atleast one 
				}//textFrames close
			}/// group close

			/////////////////////////////////GROUP CLOSE/////////////////////////////////////////////////////

			
			//////////////////////////////////NORMAL START /////////////////////////////////////////////////////
			/////var tf = app.documents[0].textFrames.everyItem().getElements();	
			var tfNormal = currentPage.textFrames.everyItem().getElements();
			///alert('Normal nnnn   -'+ tf.length);
			///alert('Normal-'+ tfNormal.length);
			for (var i = 0; i < tfNormal.length; i++) {
				var pdtFromInDesign = tfNormal[i].contents;
				///alert('Normal pdtFromInDesign '+pdtFromInDesign+'pageName-'+pageName);
				if (pdtFromInDesign != null 
					&& pdtFromInDesign != ''
					&& pdtFromInDesign != undefined 
					&& pdtFromInDesign.indexOf('[') > -1) {
					productStatus = 101;
					/// 101 -> Product In Success,
					/// 102 -> Product In Warning,
					/// 103 -> Product In Error,
					////alert(pdtFromInDesign);
					for (var g = 0; g < productData.length; g++) {
						try {

							newTextForIndesign = '';
							var pdtFromAppData = productData[g].Product;
							var weightFromAppData = productData[g].Weight;
							var rateFromAppData = productData[g].Price;
							var lengthFromAppData = productData[g].Length;

							if (pdtFromInDesign != null 
								&& pdtFromInDesign != ''
								&& pdtFromInDesign != undefined 
								&& pdtFromInDesign.indexOf(pdtFromAppData) > -1) {
								
								/// Product found in indesign
								if (pdtFromInDesign.indexOf(']g') == -1
									|| pdtFromInDesign.indexOf('$[') == -1) {
									////	alert(pdtFromInDesign + 'Normal error pdtFromInDesign '+pdtFromInDesign+'pageName-'+pageName);
									productStatus = 103;		/// 103 -> Product In Error,
									wholeProductFromInDesign.push(
										{
											'PageName': pageName,
											'Product': pdtFromInDesign,
											'IsError': true,
											'IsWarning': false,
											'IsItaNewPage': isItaNewPageForError
										});


									if (errorReturnValue.length == 0) {
										errorReturnValue += (isItaNewPageForError ? "1" : "0") + 'C12L' + pageName + 'C12L' + pdtFromInDesign + "C12L1C12L0C12LI";
									}
									else {
										errorReturnValue += "R12W" + (isItaNewPageForError ? "1" : "0") + 'C12L' + pageName + 'C12L' + pdtFromInDesign + "C12L1C12L0C12LI";
									}
									isItaNewPageForError = false;
								}

								break;
							} // found if close
							else {
								productStatus = 102;	/// 102 -> Product In Warning,
							}

							///alert('pdtFromInDesign-'+pdtFromInDesign+' | pdtFromAppData-'+pdtFromAppData+' | newTextForIndesign-'+newTextForIndesign);
						}
						catch (er) {
							alert('Normal section-' + er);
							g = productData.length - 1;
						}

					}///productData loop

					if (productStatus == 102) //// Product missing from group 	/// 102 -> Product In Warning
					{
					/////	alert(pdtFromInDesign + ' Product In Warning');
						wholeProductFromInDesign.push(
							{
								'PageName': pageName,
								'Product': pdtFromInDesign,
								'IsError': false,
								'IsWarning': true,
								'IsItaNewPage': isItaNewPageForWarning
							});
						if (warningReturnValue.length == 0) {
							warningReturnValue += (isItaNewPageForWarning ? "1" : "0") + 'C12L' + pageName + 'C12L' + pdtFromInDesign + "C12L0C12L1C12LI";
						}
						else {
							warningReturnValue += "R12W" + (isItaNewPageForWarning ? "1" : "0") + 'C12L' + pageName + 'C12L' + pdtFromInDesign + "C12L0C12L1C12LI";
						}
						isItaNewPageForWarning = false;

					}
					else if (productStatus == 101) /// 101 -> Product In Success,
					{
						////alert(pdtFromInDesign + 'Product In Success');
						wholeProductFromInDesign.push(
							{
								'PageName': pageName,
								'Product': pdtFromInDesign,
								'IsError': false,
								'IsWarning': true,
								'IsItaNewPage': isItaNewPageForSucess
							});
						if (sucessReturnValue.length == 0) {
							sucessReturnValue += (isItaNewPageForSucess ? "1" : "0") + 'C12L' + pageName + 'C12L' + pdtFromInDesign + "C12L0C12L1C12LI";
						}
						else {
							sucessReturnValue += "R12W" + (isItaNewPageForSucess ? "1" : "0") + 'C12L' + pageName + 'C12L' + pdtFromInDesign + "C12L0C12L1C12LI";
						}
						isItaNewPageForSucess = false;
					}

				}//[ atleast one

			} //text frame close
			//////////////////////////////////NORMAL END /////////////////////////////////////////////////////			


		}//page loop close
////alert('errorReturnValue'+errorReturnValue);
////alert('warningReturnValue'+warningReturnValue);
////alert('sucessReturnValue'+sucessReturnValue);
		if (errorReturnValue.length > 0 || warningReturnValue.length > 0) {
			return (errorReturnValue + "T123T" + warningReturnValue + "T123T");
		}
		else {
			return (errorReturnValue + "T123T" + warningReturnValue + "T123T" + sucessReturnValue);
		}

	}
	catch (er) {
		alert('Error GetProductDetailsFromIndesignFile-' + er)
	}
}

/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
function UpdateProductDetailsIntheIndesignFile(productData, successValues) {
	globalSuccessValues = successValues;
	///alert('UpdateProductDetailsIntheIndesignFile');
	var stringReturnValue = '';
	try {

		if (productData == null || productData == '' || productData == undefined) {
			return stringReturnValue;
		}

		/////////////////////////////////GROUP INDESIGN UPDATE START//////////////////////////////////////////////////////
		//set active document.
		var myDoc = app.activeDocument;
		//probably the same thing....
		var curDoc = app.documents[0];
		//get pages 
		var allPages = curDoc.pages;
		var pageName = '';
		////alert('Total pages-'+allPages.length);
		for (var p = 0; p < allPages.length; p++) {
			if(p > 0)
			{
				continue;
			}
			////alert('page name '+ allPages[p].name);
			currentPage = allPages[p];
			pageName = currentPage.name;
			var pg = app.activeDocument.pages[0];
			///alert('pg.name-'+pageName);
			var groups = currentPage.groups;
			////var tf_ingroup_counter = 0;
			///alert('pageName-'+pageName+'Group length-' + groups.length);
			var newTextForIndesign = '';
			for (var g = 0; g < groups.length; g++) {
				var grp = groups[g];
				//////////////////////////////Group Within Group INDESIGN UPDATE////////////////////////////////////////////////
				var innerGrps = grp.groups;
				for (var t1 = 0; t1 < innerGrps.length; t1++) {
					var innerGrp = innerGrps[t1];
					for (var t2 = 0; t2 < innerGrp.textFrames.length; t2++) {
						
						var pdtFromInDesign = innerGrp.textFrames[t2].contents;
						if (pdtFromInDesign != null && pdtFromInDesign != ''
							&& pdtFromInDesign != undefined && pdtFromInDesign.indexOf('[') > -1) {
							///	alert(pageName+' ---->'+pdtFromInDesign);
							for (var pdt = 0; pdt < productData.length; pdt++) {
								try {
									newTextForIndesign = '';
									var pdtFromAppData = productData[pdt].Product;
									var weightFromAppData = productData[pdt].Weight;
									var rateFromAppData = productData[pdt].Price;
									var lengthFromAppData = productData[pdt].Length;
									newTextForIndesign = GenerateNewCaptionForProduct(pdtFromInDesign, pdtFromAppData, weightFromAppData, rateFromAppData, lengthFromAppData,"G");
									if (newTextForIndesign != '' && newTextForIndesign.length > 0) {
										innerGrp.textFrames[t2].contents = newTextForIndesign;
										stringReturnValue += "R12W" + newTextForIndesign + 'C12L' + pageName;
										break;
										// found if close
									}
								}
								catch (er) {
									alert('UpdateProductDetailsIntheIndesignFile Group section-' + er);
								}

							} //productData loop closed

						}/// [ atleast one 
					} //innerGrp.textFrames.length
				}


				/////////////////////////////////Groups INDESIGN UPDATE//////////////////////////
				///	alert('group name '+grp);
				for (var t = 0; t < grp.textFrames.length; t++) {
					var pdtFromInDesign = grp.textFrames[t].contents;
					if (pdtFromInDesign != null && pdtFromInDesign != ''
						&& pdtFromInDesign != undefined && pdtFromInDesign.indexOf('[') > -1) {
						///	alert(pageName + ' ---->' + pdtFromInDesign);
						for (var pdt = 0; pdt < productData.length; pdt++) {
							try {
								newTextForIndesign = '';
								var pdtFromAppData = productData[pdt].Product;
								var weightFromAppData = productData[pdt].Weight;
								var rateFromAppData = productData[pdt].Price;
								var lengthFromAppData = productData[pdt].Length;
								newTextForIndesign = GenerateNewCaptionForProduct(pdtFromInDesign, pdtFromAppData, weightFromAppData, rateFromAppData, lengthFromAppData, "GG");
								if (newTextForIndesign != '' && newTextForIndesign.length > 0) {
									grp.textFrames[t].contents = newTextForIndesign;
									stringReturnValue += "R12W" + newTextForIndesign + 'C12L' + pageName;
									break;
									// found if close
								}
							}
							catch (er) {
								alert('UpdateProductDetailsIntheIndesignFile inner Group section-' + er);
							}

						} //productData loop closed

					}/// [ atleast one 
				}//textFrames close
			}/// group close


			/////////////////////////////////GROUP INDESIGN UPDATE CLOSE//////////////////////////////////////////////////////


			//////////////////////////////////NORMAL INDESIGN UPDATE START /////////////////////////////////////////////////////
			/////var tf = app.documents[0].textFrames.everyItem().getElements();	
			var tfNormal = currentPage.textFrames.everyItem().getElements();
			///alert('Normal nnnn   -'+ tfNormal.length);
			alert('Normal-'+ tfNormal.length+'sucessReturnValue'+globalSuccessValues);
			for (var i = 0; i < tfNormal.length; i++) {
				var pdtFromInDesign = tfNormal[i].contents;
				if (pdtFromInDesign != null 
					&& pdtFromInDesign != ''
					&& pdtFromInDesign != undefined)
					 {
						alert(pdtFromInDesign);
					for (var g = 0; g < productData.length; g++) {
						try {
							if (globalSuccessValues != '' 
							&& globalSuccessValues.length > 0
							&& globalSuccessValues.indexOf(pdtFromInDesign) > -1)
							{
								newTextForIndesign = '';
								var pdtFromAppData = productData[g].Product;
								var weightFromAppData = productData[g].Weight;
								var rateFromAppData = productData[g].Price;
								var lengthFromAppData = productData[g].Length;
								newTextForIndesign = GenerateNewCaptionForProduct(pdtFromInDesign, pdtFromAppData, weightFromAppData, rateFromAppData, lengthFromAppData,"I")
								///alert('newTextForIndesign'+newTextForIndesign);
								if (newTextForIndesign != '' && newTextForIndesign.length > 0) {
									tfNormal[i].contents = newTextForIndesign;
									stringReturnValue += "R12W" + newTextForIndesign + 'C12L' + pageName;
									break;
									// found if close
								}
							}
						}
						catch (er) {
							alert('UpdateProductDetailsIntheIndesignFile Normal section-' + er);
						}

					}///productData loop

				}//[ atleast one

			} //text frame close
			//////////////////////////////////NORMAL END /////////////////////////////////////////////////////			

		}//page loop close

		return stringReturnValue;
	}
	catch (er) {
		alert('Error UpdateProductDetailsIntheIndesignFile-' + er)
	}
}



function GenerateNewCaptionForProduct(pdtFromInDesign, pdtFromAppData, weightFromAppData, rateFromAppData, lengthFromAppData,from) {
	var newTextForIndesign = '';
/*
if(pdtFromInDesign.indexOf('BRC1466') == -1)
{
	return "";
}
		*/
/// alert('pdtFromInDesign-'+pdtFromInDesign+' | pdtFromAppData-'+pdtFromAppData+' | from-'+from);
	if (pdtFromInDesign != null && pdtFromInDesign != ''
		&& pdtFromInDesign != undefined
		&& pdtFromInDesign.indexOf(pdtFromAppData) > -1
		&& pdtFromInDesign.indexOf('[') > -1) 
		{
			var indesignProducts = pdtFromInDesign.split('[');
			////alert(pdtFromInDesign + ' - ' + from + ' | indesignProducts.length- '+ indesignProducts.length);

		for (var inc = 0; inc < indesignProducts.length; inc++) {
			var item = indesignProducts[inc];
			
			 ////alert(	item);
			
			//// First Item
			if (item.indexOf('[') == -1 && item.indexOf(']') == -1 && item.indexOf('$') == -1 && inc == 0) {
				newTextForIndesign += item;
			}
			else if (item == '$') {
				newTextForIndesign += item;
			}
			else if (item.indexOf('[') > -1 && item.indexOf(']g') > -1 && item.indexOf('wt') > -1)//Weight
			{
				newTextForIndesign += weightFromAppData + 'g';
			}
			else if (item.indexOf('[') > -1 && item.indexOf(']') > -1 && item.indexOf('$') > -1) {

			}
			else if (item.indexOf('$[') > -1 && item.indexOf(']') > -1 && item.indexOf('pr') > -1)////Price
			{
				newTextForIndesign += '$' + rateFromAppData;
			}
			else if (item.indexOf('[') > -1 && item.indexOf(']') > -1 && item.indexOf('ln') > -1) 
			{
				newTextForIndesign += lengthFromAppData;
			}
			else {
				newTextForIndesign += item;
			}
			//if else close
		}// for loop end
		alert('pdtFromInDesign-'+pdtFromInDesign+'newTextForIndesign-'+newTextForIndesign)
	}//if end

	return newTextForIndesign;
}//function close