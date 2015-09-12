
function readConditions(elmArray) {
    var ifCond = 'if(';
    var total = elmArray.length;            
    var exec = '';
    var results = "{";
    var rElm = "";                        
    
    $.each(elmArray, function(i, elm) {
        var condition = elm.attr('data-condition-value');
        console.log('condition', condition);
        
        if(typeof condition !== typeof undefined && condition !== false) {
            var elmVal = condition;
            if(elm.attr('type') === 'radio') {
                ifCond += "$('input[name="+elm.attr('name')+"]:checked').val() == '"+elmVal+"'";
            }
            if(elm.attr('type') === 'checkbox') {
                ifCond += "$('input[name="+elm.attr('name')+"]').is(':checked')";
            }                        
            if(elm.is('select')) {
                ifCond += "$('select[name="+elm.attr('name')+"]').val() == '"+elmVal+"'";
            }
            if(total > 0 && i < total - 1) {
                ifCond += " && ";
            }
        }
        
        var resultType = elm.attr('data-result-type');
        
        var resultHide = elm.attr('data-result-hide');
        if(typeof resultHide !== typeof undefined && resultHide !== false) {
            if(resultType === 'select') {
                rElm = "$('select[name="+resultHide+"]')";                            
            }
            if(resultType === 'radio') {
                rElm = "$('input[name="+resultHide+"]')";
            }
            if(resultType === 'text') {
                rElm = "$('input[name="+resultHide+"]')";
            }
            results += rElm + '.hide();';
            results += '} else {'+rElm + '.show();';            
        }
        
        var resultShow = elm.attr('data-result-show');
        if(typeof resultShow !== typeof undefined && resultShow !== false) {
            if(resultType === 'select') {
                rElm = "$('select[name="+resultShow+"]')";                            
            }
            if(resultType === 'radio') {
                rElm = "$('input[name="+resultShow+"]')";
            }
            if(resultType === 'text') {
                rElm = "$('input[name="+resultShow+"]')";
            }
            results += rElm + '.show();';
            results += '} else {'+rElm + '.hide();';            
        }        
    });
    
    ifCond += ")";
    console.log('ifCond',ifCond);
    results += "}";
    console.log('results', results);                        
    exec += ifCond + results;
    console.log('exec',exec);
    
    $.each(elmArray, function(i, elm) {    
        var evnt = null;        
        if(elm.attr('type') === 'radio') {
            evnt = "$('input[name="+elm.attr('name')+"]')";
        }
        if(elm.attr('type') === 'checkbox') {
            evnt = "$('input[name="+elm.attr('name')+"]')";                                   
        }
        if(elm.is('select')) {
            evnt = "$('select[name="+elm.attr('name')+"]')";
        }
        var tobeEval = evnt + '.change(function(){'+exec+'});';
        console.log('tobeEval',tobeEval);
        eval(tobeEval);        
    }); 
}

