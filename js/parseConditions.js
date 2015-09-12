
function readConditions(jsonFile) {
    console.log('readConditions...',jsonFile);
    $.getJSON(jsonFile, function( data ) {
        console.log(data);
        if(data.hasOwnProperty("conditions")) {
            $.each(data.conditions, function(i, cond){
                if(cond.hasOwnProperty('condition') && cond.hasOwnProperty('result')) {
                    var ifCond = 'if(';
                    var total = cond.condition.length;
                    $.each(cond.condition, function(i, c){
                        var elmVal = null;
                        if(c.type == 'radio') {
                            elmVal = c.value;
                            ifCond += "$('input[name="+c.name+"]:checked').val() == '"+elmVal+"'";
                                   
                        }
                        if(c.type == 'checkbox') {
                            ifCond += "$('input[name="+c.name+"]').is(':checked')";
                        }                        
                        if(c.type == 'select') {
                            elmVal = c.value
                            ifCond += "$('select[name="+c.name+"]').val() == '"+elmVal+"'";
                        }
                        if(total > 0 && i < total - 1) {
                            ifCond += " && "
                        }                        
                    });
                    ifCond += ")";
                    console.log('ifCond',ifCond);
                    var exec = '';
                    
                    $.each(cond.result, function(i, r){
                        var results = "{";
                        var rElm = "";                        
                        if(r.type == 'select') {
                            rElm = "$('select[name="+r.name+"]')";                            
                        }
                        if(r.type == 'radio') {
                            rElm = "$('input[name="+r.name+"]')";
                        }
                        if(r.type == 'text') {
                            rElm = "$('input[name="+r.name+"]')";
                        }
                        if(r.show == "yes") {
                            results += rElm + '.show();';
                            results += '} else {'+rElm + '.hide();';
                        }
                        else {
                            results += rElm + '.hide();';
                            results += '} else {'+rElm + '.show();';
                        }
                        results += "}";
                        console.log('results', results);                        
                        exec += ifCond + results;
                        console.log('exec',exec);
                    });
                    $.each(cond.condition, function(i, c){
                        var elm = null;
                        if(c.type == 'radio') {
                            elm = "$('input[name="+c.name+"]')";                                   
                        }
                        if(c.type == 'checkbox') {
                            elm = "$('input[name="+c.name+"]')";                                   
                        }                        
                        if(c.type == 'select') {
                            elm = "$('select[name="+c.name+"]')";
                        }
                        var tobeEval = elm + '.change(function(){'+exec+'});';
                        console.log('tobeEval',tobeEval);
                        eval(tobeEval);
                    });                    
                }
            });
        }
    });    
}

