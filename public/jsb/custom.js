
$(document).ready(function() {
    $('table.display').DataTable();
} );
$( function() {
    $( "#ratechangedate" ).datepicker({
        changeMonth: true,
        changeYear: true,
        dateFormat: 'dd/mm/yy',
        maxDate: new Date,
        minDate: new Date(2000, 6, 12)
    });

    $( "#offerstartdate" ).datepicker({
        changeMonth: true,
        changeYear: true,
        dateFormat: 'dd/mm/yy',
        minDate: new Date
    });

    $( "#offerenddate" ).datepicker({
        changeMonth: true,
        changeYear: true,
        dateFormat: 'dd/mm/yy',
        minDate: new Date
    });

    $( "#filterstartdate" ).datepicker({
        changeMonth: true,
        changeYear: true,
        dateFormat: 'dd/mm/yy'
    });

    $( "#filterenddate" ).datepicker({
        changeMonth: true,
        changeYear: true,
        dateFormat: 'dd/mm/yy'
    });
    // $( "#date" ).datepicker({
    //     changeMonth: true,
    //     changeYear: true,
    //     dateFormat: 'dd/mm/yy'
    // });
    $(document).ready(function()
    {
        $("#example").DataTable();
      });

    $('#offerstarttime').timepicker({ 'timeFormat': 'h:i A' });
    $('#offerendtime').timepicker({ 'timeFormat': 'h:i A' });
});
$(document).ready(function()
{
    $(".datepicker").datepicker({
        format : 'dd/mm/yy',
        autoclose: true,
    });
});

$(document).ready(function () {   
    var table;
    table = jQuery('.product_detail_table').DataTable({
        dom: 'Bfrtip',
        "lengthChange": true,
        buttons: [
            'excel',
            'print',
            'pdf'
        ]
    });
    'use strict';
    $.urlParam = function(name){
        var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
        if (results==null){
           return null;
        }
        else{
           return decodeURI(results[1]) || 0;
        }
    }
    function datatablesearch() {
        var whatsSelected = [];
        var filterValue = $("input[name='formfilter']:checked").val();
        console.log(filterValue);
        if(filterValue != 'all') {
            whatsSelected.push(filterValue);
            table.columns(7).search(whatsSelected.join('|'),true).draw();
        } else {
            $('.product_detail_table').DataTable().destroy();
            table = '';
            table = jQuery('.product_detail_table').DataTable({
                dom: 'Bfrtip',
                buttons: [
                    'excel',
                    'print',
                    'pdf',
                
                ]
            });
        }
    }
    var para, checkpass;
    para = $.urlParam('success');
    if( para == 1) {
        setTimeout(function(){ window.location.href = '/products/all'; }, 10000);
    }

    checkpass = $.urlParam('pass');
    if( checkpass == 1) {
        setTimeout(function(){ window.location.href = '/settings/passwordsetting'; }, 10000);
    }
    
    $('.repeater').repeater({
        isFirstItemUndeletable: true,
        defaultValues: {
            'textarea-input': 'foo',
            'text-input': 'bar',
            'select-input': 'B',
            'checkbox-input': ['A', 'B'],
        },
        show: function () {
            $(this).slideDown();
        },
        hide: function (deleteElement) {
            if(confirm('Are you sure you want to delete this element?')) {
                $(this).slideUp(deleteElement);
            }
        },
        repeaters: [{
            isFirstItemUndeletable: true,
            selector: '.inner-repeater',
            show: function () {
                $(this).slideDown();
            },
            hide: function (deleteElement) {
                $(this).slideUp(deleteElement);
            }
        }],
        ready: function (setIndexes) {
        }
    });
     function datatablesearch() {
        var whatsSelected = [];
        var filterValue = $("input[name='formfilter']:checked").val();
        console.log(filterValue);
        if(filterValue != 'all') {
            whatsSelected.push(filterValue);
            table.columns(7).search(whatsSelected.join('|'),true).draw();
        } else {
            $('.product_detail_table').DataTable().destroy();
            table = '';
            table = jQuery('.product_detail_table').DataTable({
                dom: 'lrtip',
                "lengthChange": false,
                initComplete: function () {
                }
            });
        }
    }

    $(document).on("click", "input[name='formfilter']", function(){
        datatablesearch();
    });
});
$(document).on("click", "input[name='formfilter']", function(){
    datatablesearch();
});
$(document).on("change", "#countryid", function() {
    $('.loader').show(); 
    var countryID =  $("#countryid option:selected").attr("data-country");
    alert(countryID);
    $.ajax({
        type:'GET',
        url: '/city_mast/getstateid',
        dataType:'json',
        data:
        {
            id: countryID
        },
        success: function(data) {
            if( data['success'] ) {
                var statArray = data['state_name'];
                alert(statArray);
                var i;
                var result = '<select class="form-control" name="state_name" id="state_name">';
                // $.each(statArray, function( index, value ) {
                //     alert(statArray);
                    result += '<option value="'+statArray._id+'">'+statArray.state_name+'</option>';
                // });
                result += '</select>';
                $('.state_name_div').html(result);
                $('.loader').hide();
            }
        }
    });
});
$(document).on("change", "#kind", function() {
    $('.loader').show();
    var partyID =  $("#kind option:selected").attr("data-party_id");
     alert(partyID); 
    $.ajax({
        type:'GET',
        url: '/contract_sauda/kindname',
        dataType:'json',
        data:
        {
            id: partyID
        },
        success: function(data) {
            if( data['success'] ) {
                var kindArray = data['party']['contact_group'];
                // alert(kindArray);
                var  j;
                var result='';
                for(j = 0; j < kindArray.length; j++) {
                    result += '<input class="form-control" name="sl_cont" value="'+kindArray[j]['contact_no']+'" type="text" autocomplete="off"/>';
                }
                $('.kind_name_div').html(result);
                $('.loader').hide();
            }
        }
    });
});
$(document).on('click', '.edit_prodt', function(){
    var prodtid = $(this).attr('data-id');
    // alert(prodtid);
    $('.loader').show();
    $.ajax({
        type:'GET',
        url: '/product_type_mast/'+prodtid,
        dataType:'json',
        success: function(response) {
            if(response['success'] == true) {
                console.log(response);
                var prdt_typ_name = response['product'].prdt_typ_name;
                var prodtid = response['product']._id;
                var prdt_code = response['product'].prdt_code;
                $('.prdt_typ_name').val(prdt_typ_name);
                $('.prdt_code').val(prdt_code);
                $('#edit_prodt_typ').show();
                $('#edit').show();
                $('#prdt_typ_add').hide();
                $('#add').hide();
                $("#edit_prodt_typ").attr("action", "/product_type_mast/edit_prdt_mast/" + prodtid);
            } else {
                $('.branddanger').html(response['message']);
                $('.branddanger').show();
                $('.brandsuccess').hide();
            }
            $('.loader').hide();
        },
        error: function(err) {
            console.log(err);
        }
    });
});
$(document).on('click', '.delete_prodt', function(){
    $('.loader').show();
    let id = $(this).attr('data-id');
    $.ajax({
        type:'DELETE',
        url: '/product_type_mast/'+id,
        success: function(response) {
            alert('confirm(Are you sure want to delete.)');
            window.location.href='/product_type_mast/product_type_mast';
            $('.loader').hide();
        },
        error: function(err) {
            console.log(err);
        }
    });
});
$(document).on('click', '.edit_country', function(){
    var countryid = $(this).attr('data-id');
    // alert(prodtid);
    $('.loader').show();
    $.ajax({
        type:'GET',
        url: '/country_mast/'+countryid,
        dataType:'json',
        success: function(response) {
            if(response['success'] == true) {
                console.log(response);
                var country_name = response['country'].country_name;
                var countryid = response['country']._id;
                var country_code = response['country'].country_code;
                $('.country_name').val(country_name);
                $('.country_code').val(country_code);
                $('#edit_country').show();
                $('#edit').show();
                $('#country_add').hide();
                $('#add').hide();
                $("#edit_country").attr("action", "/country_mast/edit_country_mast/" + countryid);
            } else {
                $('.branddanger').html(response['message']);
                $('.branddanger').show();
                $('.brandsuccess').hide();
            }
            $('.loader').hide();
        },
        error: function(err) {
            console.log(err);
        }
    });
});
$(document).on('click', '.delete_country', function(){
    $('.loader').show();
    let id = $(this).attr('data-id');
    $.ajax({
        type:'DELETE',
        url: '/country_mast/'+id,
        success: function(response) {
            alert('confirm(Are you sure want to delete.)');
            window.location.href='/country_mast/country_mast';
            $('.loader').hide();
        },
        error: function(err) {
            console.log(err);
        }
    });
});
$(document).on('click', '.edit_state', function(){
    var stateid = $(this).attr('data-id');
    // alert(prodtid);
    $('.loader').show();
    $.ajax({
        type:'GET',
        url: '/state_mast/'+stateid,
        dataType:'json',
        success: function(response) {
            if(response['success'] == true) {
                console.log(response);
                var countryid = response['state'].countryid;
                var state_name = response['state'].state_name;
                var stateid = response['state']._id;
                var state_code = response['state'].state_code;
                $('.countryid').val(countryid);
                $('.state_name').val(state_name);
                $('.state_code').val(state_code);
                $('#edit_state').show();
                $('#edit').show();
                $('#state_add').hide();
                $('#add').hide();
                $("#edit_state").attr("action", "/state_mast/edit_state_mast/" + stateid);
            } else {
                $('.branddanger').html(response['message']);
                $('.branddanger').show();
                $('.brandsuccess').hide();
            }
            $('.loader').hide();
        },
        error: function(err) {
            console.log(err);
        }
    });
});
$(document).on('click', '.delete_state', function(){
    $('.loader').show();
    let id = $(this).attr('data-id');
    $.ajax({
        type:'DELETE',
        url: '/state_mast/'+id,
        success: function(response) {
            alert('confirm(Are you sure want to delete.)');
            window.location.href='/state_mast/state_mast';
            $('.loader').hide();
        },
        error: function(err) {
            console.log(err);
        }
    });
});
$(document).on('click', '.edit_city', function(){
    var cityid = $(this).attr('data-id');
    // alert(prodtid);
    $('.loader').show();
    $.ajax({
        type:'GET',
        url: '/city_mast/'+cityid,
        dataType:'json',
        success: function(response) {
            if(response['success'] == true) {
                console.log(response);
                var countryid = response['city'].countryid;
                var stateid = response['city'].stateid;
                var cityid = response['city']._id;
                var city_name = response['city'].city_name;
                var city_code = response['city'].city_code;
                $('.countryid').val(countryid);
                $('.stateid').val(stateid);
                $('.city_name').val(city_name);
                $('.city_code').val(city_code);
                $('#edit_city').show();
                $('#edit').show();
                $('#city_add').hide();
                $('#add').hide();
                $("#edit_city").attr("action", "/city_mast/edit_city_mast/" + cityid);
            } else {
                $('.branddanger').html(response['message']);
                $('.branddanger').show();
                $('.brandsuccess').hide();
            }
            $('.loader').hide();
        },
        error: function(err) {
            console.log(err);
        }
    });
});
$(document).on('click', '.delete_city', function(){
    $('.loader').show();
    let id = $(this).attr('data-id');
    $.ajax({
        type:'DELETE',
        url: '/city_mast/'+id,
        success: function(response) {
            alert('confirm(Are you sure want to delete.)');
            window.location.href='/city_mast/city_mast';
            $('.loader').hide();
        },
        error: function(err) {
            console.log(err);
        }
    });
}); 

$(document).on('click', '.edit_vernish', function(){
    var vernishid = $(this).attr('data-id');
    // alert(prodtid);
    $('.loader').show();
    $.ajax({
        type:'GET',
        url: '/varnish_mast/'+vernishid,
        dataType:'json',
        success: function(response) {
            if(response['success'] == true) {
                console.log(response);
                var vernish_name = response['vernish'].vernish_name;
                var vernis_code = response['vernish'].vernis_code;
                var vernishid = response['vernish']._id;
                $('.vernish_name').val(vernish_name);
                $('.vernis_code').val(vernis_code);
                $('#edit_vernish').show();
                $('#edit').show();
                $('#varnish_add').hide();
                $('#add').hide();
                $("#edit_vernish").attr("action", "/varnish_mast/edit_varnish_mast/" + vernishid);
            } else {
                $('.branddanger').html(response['message']);
                $('.branddanger').show();
                $('.brandsuccess').hide();
            }
            $('.loader').hide();
        },
        error: function(err) {
            console.log(err);
        }
    });
});
$(document).on('click', '.delete_vernish', function(){
    $('.loader').show();
    let id = $(this).attr('data-id');
    $.ajax({
        type:'DELETE',
        url: '/varnish_mast/'+id,
        success: function(response) {
            alert('confirm(Are you sure want to delete.)');
            window.location.href='/varnish_mast/varnish_mast';
            $('.loader').hide();
        },
        error: function(err) {
            console.log(err);
        }
    });
}); 
$(document).on('click', '.edit_blanket', function(){
    var blanketid = $(this).attr('data-id');
    // alert(prodtid);
    $('.loader').show();
    $.ajax({
        type:'GET',
        url: '/blankettyp_mast/'+blanketid,
        dataType:'json',
        success: function(response) {
            if(response['success'] == true) {
                console.log(response);
                var blanket_name = response['blanket'].blanket_name;
                var blanketid = response['blanket']._id;
                var blanketyp_ups = response['blanket'].blanketyp_ups;
                var blanket_size = response['blanket'].blanket_size;
                var blanket_in = response['blanket'].blanket_in;
                $('.blanket_name').val(blanket_name);
                $('.blanketyp_ups').val(blanketyp_ups);
                $('.blanket_size').val(blanket_size);
                $('.blanket_in').val(blanket_in);
                $('#edit_blanket').show();
                $('#edit').show();
                $('#blanket_add').hide();
                $('#add').hide();
                $("#edit_blanket").attr("action", "/blankettyp_mast/edit_blanket_mast/" + blanketid);
            } else {
                $('.branddanger').html(response['message']);
                $('.branddanger').show();
                $('.brandsuccess').hide();
            }
            $('.loader').hide();
        },
        error: function(err) {
            console.log(err);
        }
    });
});
$(document).on('click', '.delete_blanket', function(){
    $('.loader').show();
    let id = $(this).attr('data-id');
    $.ajax({
        type:'DELETE',
        url: '/blankettyp_mast/'+id,
        success: function(response) {
            alert('confirm(Are you sure want to delete.)');
            window.location.href='/blankettyp_mast/blankettyp_mast';
            $('.loader').hide();
        },
        error: function(err) {
            console.log(err);
        }
    });
}); 
$(document).on('click', '.edit_design', function(){
    var designid = $(this).attr('data-id');
    // alert(prodtid);
    $('.loader').show();
    $.ajax({
        type:'GET',
        url: '/designstyl_mast/'+designid,
        dataType:'json',
        success: function(response) {
            if(response['success'] == true) {
                console.log(response);
                var design_style = response['design'].design_style;
                var design_code = response['design'].design_code;
                var designid = response['design']._id;
                $('.design_style').val(design_style);
                $('.design_code').val(design_code);
                $('#edit_design').show();
                $('#edit').show();
                $('#design_add').hide();
                $('#add').hide();
                $("#edit_design").attr("action", "/designstyl_mast/edit_design_mast/" + designid);
            } else {
                $('.branddanger').html(response['message']);
                $('.branddanger').show();
                $('.brandsuccess').hide();
            }
            $('.loader').hide();
        },
        error: function(err) {
            console.log(err);
        }
    });
});
$(document).on('click', '.delete_design', function(){
    $('.loader').show();
    let id = $(this).attr('data-id');
    $.ajax({
        type:'DELETE',
        url: '/designstyl_mast/'+id,
        success: function(response) {
            alert('confirm(Are you sure want to delete.)');
            window.location.href='/designstyl_mast/designstyl_mast';
            $('.loader').hide();
        },
        error: function(err) {
            console.log(err);
        }
    });
}); 
$(document).on('click', '.edit_manufacturer', function(){
    var manufacturid = $(this).attr('data-id');
    // alert(prodtid);
    $('.loader').show();
    $.ajax({
        type:'GET',
        url: '/manufactur_mast/'+manufacturid,
        dataType:'json',
        success: function(response) {
            if(response['success'] == true) {
                console.log(response);
                var manufactur_name = response['manufactur'].manufactur_name;
                var manufactur_code = response['manufactur'].manufactur_code;
                var manufactur_typ = response['manufactur'].manufactur_typ;
                var manufacturid = response['manufactur']._id;
                $('.manufactur_name').val(manufactur_name);
                $('.manufactur_code').val(manufactur_code);
                $('.manufactur_typ').val(manufactur_typ);
                $('#edit_manufacturer').show();
                $('#edit').show();
                $('#manufacturer_add').hide();
                $('#add').hide();
                $("#edit_manufacturer").attr("action", "/manufactur_mast/edit_manufacturer_mast/" + manufacturid);
            } else {
                $('.branddanger').html(response['message']);
                $('.branddanger').show();
                $('.brandsuccess').hide();
            }
            $('.loader').hide();
        },
        error: function(err) {
            console.log(err);
        }
    });
});
$(document).on('click', '.delete_manufacturer', function(){
    $('.loader').show();
    let id = $(this).attr('data-id');
    $.ajax({
        type:'DELETE',
        url: '/manufactur_mast/'+id,
        success: function(response) {
            alert('confirm(Are you sure want to delete.)');
            window.location.href='/manufactur_mast/manufactur_mast';
            $('.loader').hide();
        },
        error: function(err) {
            console.log(err);
        }
    });
}); 
$(document).on('click', '.edit_construction', function(){
    var constructionid = $(this).attr('data-id');
    // alert(prodtid);
    $('.loader').show();
    $.ajax({
        type:'GET',
        url: '/construction_mast/'+constructionid,
        dataType:'json',
        success: function(response) {
            if(response['success'] == true) {
                console.log(response);
                var construction_name = response['construction'].construction_name;
                var construction_code = response['construction'].construction_code;
                var constructionid = response['construction']._id;
                $('.construction_name').val(construction_name);
                $('.construction_code').val(construction_code);
                $('#edit_construction').show();
                $('#edit').show();
                $('#construction_add').hide();
                $('#add').hide();
                $("#edit_construction").attr("action", "/construction_mast/edit_construction_mast/" + constructionid);
            } else {
                $('.branddanger').html(response['message']);
                $('.branddanger').show();
                $('.brandsuccess').hide();
            }
            $('.loader').hide();
        },
        error: function(err) {
            console.log(err);
        }
    });
});
$(document).on('click', '.delete_construction', function(){
    $('.loader').show();
    let id = $(this).attr('data-id');
    $.ajax({
        type:'DELETE',
        url: '/construction_mast/'+id,
        success: function(response) {
            alert('confirm(Are you sure want to delete.)');
            window.location.href='/construction_mast/construction_mast';
            $('.loader').hide();
        },
        error: function(err) {
            console.log(err);
        }
    });
}); 
$(document).on('click', '.edit_indsrttyp', function(){
    var indsrttypid = $(this).attr('data-id');
    // alert(prodtid);
    $('.loader').show();
    $.ajax({
        type:'GET',
        url: '/inserttyp_mast/'+indsrttypid,
        dataType:'json',
        success: function(response) {
            if(response['success'] == true) {
                console.log(response);
                var indsrttyp_dscrpton = response['inserttyp'].indsrttyp_dscrpton;
                var indsrttyp_qty = response['inserttyp'].indsrttyp_qty;
                var indsrttyp_code = response['inserttyp'].indsrttyp_code;
                var indsrttypid = response['inserttyp']._id;
                $('.indsrttyp_dscrpton').val(indsrttyp_dscrpton);
                $('.indsrttyp_qty').val(indsrttyp_qty);
                $('.indsrttyp_code').val(indsrttyp_code);
                $('#edit_insrttyp').show();
                $('#edit').show();
                $('#insrttyp_add').hide();
                $('#add').hide();
                $("#edit_insrttyp").attr("action", "/inserttyp_mast/edit_insrttyp_mast/" + indsrttypid);
            } else {
                $('.branddanger').html(response['message']);
                $('.branddanger').show();
                $('.brandsuccess').hide();
            }
            $('.loader').hide();
        },
        error: function(err) {
            console.log(err);
        }
    });
});
$(document).on('click', '.delete_indsrttyp', function(){
    $('.loader').show();
    let id = $(this).attr('data-id');
    $.ajax({
        type:'DELETE',
        url: '/inserttyp_mast/'+id,
        success: function(response) {
            alert('confirm(Are you sure want to delete.)');
            window.location.href='/inserttyp_mast/inserttyp_mast';
            $('.loader').hide();
        },
        error: function(err) {
            console.log(err);
        }
    });
}); 
$(document).on('click', '.edit_floading', function(){
    var floadingid = $(this).attr('data-id');
    // alert(prodtid);
    $('.loader').show();
    $.ajax({
        type:'GET',
        url: '/floading_mast/'+floadingid,
        dataType:'json',
        success: function(response) {
            if(response['success'] == true) {
                console.log(response);
                var floading_desp = response['floading'].floading_desp;
                var floading_code = response['floading'].floading_code;
                var floadingid = response['floading']._id;
                $('.floading_desp').val(floading_desp);
                $('.floading_code').val(floading_code);
                $('#edit_floading').show();
                $('#edit').show();
                $('#floading_add').hide();
                $('#add').hide();
                $("#edit_floading").attr("action", "/floading_mast/edit_floading_mast/" + floadingid);
            } else {
                $('.branddanger').html(response['message']);
                $('.branddanger').show();
                $('.brandsuccess').hide();
            }
            $('.loader').hide();
        },
        error: function(err) {
            console.log(err);
        }
    });
});
$(document).on('click', '.delete_floading', function(){
    $('.loader').show();
    let id = $(this).attr('data-id');
    $.ajax({
        type:'DELETE',
        url: '/floading_mast/'+id,
        success: function(response) {
            alert('confirm(Are you sure want to delete.)');
            window.location.href='/floading_mast/floading_mast';
            $('.loader').hide();
        },
        error: function(err) {
            console.log(err);
        }
    });
}); 
$(document).on('click', '.edit_sop', function(){
    var sopid = $(this).attr('data-id');
    // alert(prodtid);
    $('.loader').show();
    $.ajax({
        type:'GET',
        url: '/sop_mast/'+sopid,
        dataType:'json',
        success: function(response) {
            if(response['success'] == true) {
                console.log(response);
                var sop_desp = response['sop'].sop_desp;
                var sopid = response['sop']._id;
                $('.sop_desp').val(sop_desp);
                $('#edit_sop').show();
                $('#edit').show();
                $('#sop_add').hide();
                $('#add').hide();
                $("#edit_sop").attr("action", "/sop_mast/edit_sop_mast/" + sopid);
            } else {
                $('.branddanger').html(response['message']);
                $('.branddanger').show();
                $('.brandsuccess').hide();
            }
            $('.loader').hide();
        },
        error: function(err) {
            console.log(err);
        }
    });
});
$(document).on('click', '.delete_sop', function(){
    $('.loader').show();
    let id = $(this).attr('data-id');
    $.ajax({
        type:'DELETE',
        url: '/sop_mast/'+id,
        success: function(response) {
            alert('confirm(Are you sure want to delete.)');
            window.location.href='/sop_mast/sop_mast';
            $('.loader').hide();
        },
        error: function(err) {
            console.log(err);
        }
    });
}); 
$(document).on('click', '.edit_deviation', function(){
    var deviationid = $(this).attr('data-id');
    // alert(prodtid);
    $('.loader').show();
    $.ajax({
        type:'GET',
        url: '/deviation_mast/'+deviationid,
        dataType:'json',
        success: function(response) {
            if(response['success'] == true) {
                console.log(response);
                var deviation_name = response['deviation'].deviation_name;
                var deviation_code = response['deviation'].deviation_code;
                var deviationid = response['deviation']._id;
                $('.deviation_name').val(deviation_name);
                $('.deviation_code').val(deviation_code);
                $('#edit_deviation').show();
                $('#edit').show();
                $('#deviation_add').hide();
                $('#add').hide();
                $("#edit_deviation").attr("action", "/deviation_mast/edit_deviation_mast/" + deviationid);
            } else {
                $('.branddanger').html(response['message']);
                $('.branddanger').show();
                $('.brandsuccess').hide();
            }
            $('.loader').hide();
        },
        error: function(err) {
            console.log(err);
        }
    });
});
$(document).on('click', '.delete_deviation', function(){
    $('.loader').show();
    let id = $(this).attr('data-id');
    $.ajax({
        type:'DELETE',
        url: '/deviation_mast/'+id,
        success: function(response) {
            alert('confirm(Are you sure want to delete.)');
            window.location.href='/deviation_mast/deviation_mast';
            $('.loader').hide();
        },
        error: function(err) {
            console.log(err);
        }
    });
}); 
$(document).on('click', '.edit_complaint', function(){
    var complaintid = $(this).attr('data-id');
    // alert(prodtid);
    $('.loader').show();
    $.ajax({
        type:'GET',
        url: '/complaint_mast/'+complaintid,
        dataType:'json',
        success: function(response) {
            if(response['success'] == true) {
                console.log(response);
                var complaint_name = response['complaint'].complaint_name;
                var complaint_code = response['complaint'].complaint_code;
                var complaintid = response['complaint']._id;
                $('.complaint_name').val(complaint_name);
                $('.complaint_code').val(complaint_code);
                $('#edit_complaint').show();
                $('#edit').show();
                $('#complaint_add').hide();
                $('#add').hide();
                $("#edit_complaint").attr("action", "/complaint_mast/edit_complaint_mast/" + complaintid);
            } else {
                $('.branddanger').html(response['message']);
                $('.branddanger').show();
                $('.brandsuccess').hide();
            }
            $('.loader').hide();
        },
        error: function(err) {
            console.log(err);
        }
    });
});
$(document).on('click', '.delete_complaint', function(){
    $('.loader').show();
    let id = $(this).attr('data-id');
    $.ajax({
        type:'DELETE',
        url: '/complaint_mast/'+id,
        success: function(response) {
            alert('confirm(Are you sure want to delete.)');
            window.location.href='/complaint_mast/complaint_mast';
            $('.loader').hide();
        },
        error: function(err) {
            console.log(err);
        }
    });
}); 
$(document).on('click', '.edit_vehiclemaintnce', function(){
    var vehiclemaintnceid = $(this).attr('data-id');
    // alert(prodtid);
    $('.loader').show();
    $.ajax({
        type:'GET',
        url: '/vehiclemaintnce_mast/'+vehiclemaintnceid,
        dataType:'json',
        success: function(response) {
            if(response['success'] == true) {
                console.log(response);
                var vehiclemaintnce_name = response['vehiclemaintnce'].vehiclemaintnce_name;
                var vehiclemaintnce_code = response['vehiclemaintnce'].vehiclemaintnce_code;
                var vehiclemaintnceid = response['vehiclemaintnce']._id;
                $('.vehiclemaintnce_name').val(vehiclemaintnce_name);
                $('.vehiclemaintnce_code').val(vehiclemaintnce_code);
                $('#edit_vehiclemaintnce').show();
                $('#edit').show();
                $('#vehiclemaintnce_add').hide();
                $('#add').hide();
                $("#edit_vehiclemaintnce").attr("action", "/vehiclemaintnce_mast/edit_vehiclemaintnce_mast/" + vehiclemaintnceid);
            } else {
                $('.branddanger').html(response['message']);
                $('.branddanger').show();
                $('.brandsuccess').hide();
            }
            $('.loader').hide();
        },
        error: function(err) {
            console.log(err);
        }
    });
});
$(document).on('click', '.delete_vehiclemaintnce', function(){
    $('.loader').show();
    let id = $(this).attr('data-id');
    $.ajax({
        type:'DELETE',
        url: '/vehiclemaintnce_mast/'+id,
        success: function(response) {
            alert('confirm(Are you sure want to delete.)');
            window.location.href='/vehiclemaintnce_mast/vehiclemaintnce_mast';
            $('.loader').hide();
        },
        error: function(err) {
            console.log(err);
        }
    });
}); 
$(document).on('click', '.edit_trnsportagncy', function(){
    var trnsportagncyid = $(this).attr('data-id');
    // alert(prodtid);
    $('.loader').show();
    $.ajax({
        type:'GET',
        url: '/trnsportagncy_mast/'+trnsportagncyid,
        dataType:'json',
        success: function(response) {
            if(response['success'] == true) {
                console.log(response);
                var trnsportagncy_name = response['trnsportagncy'].trnsportagncy_name;
                var trnsportagncy_code = response['trnsportagncy'].trnsportagncy_code;
                var trnsportagncyid = response['trnsportagncy']._id;
                $('.trnsportagncy_name').val(trnsportagncy_name);
                $('.trnsportagncy_code').val(trnsportagncy_code);
                $('#edit_trnsportagncy').show();
                $('#edit').show();
                $('#trnsportagncy_add').hide();
                $('#add').hide();
                $("#edit_trnsportagncy").attr("action", "/trnsportagncy_mast/edit_trnsportagncy_mast/" + trnsportagncyid);
            } else {
                $('.branddanger').html(response['message']);
                $('.branddanger').show();
                $('.brandsuccess').hide();
            }
            $('.loader').hide();
        },
        error: function(err) {
            console.log(err);
        }
    });
});
$(document).on('click', '.delete_trnsportagncy', function(){
    $('.loader').show();
    let id = $(this).attr('data-id');
    $.ajax({
        type:'DELETE',
        url: '/trnsportagncy_mast/'+id,
        success: function(response) {
            alert('confirm(Are you sure want to delete.)');
            window.location.href='/trnsportagncy_mast/trnsportagncy_mast';
            $('.loader').hide();
        },
        error: function(err) {
            console.log(err);
        }
    });
}); 
$(document).on('click', '.edit_accessriestyp', function(){
    var accessriestypid = $(this).attr('data-id');
    // alert(prodtid);
    $('.loader').show();
    $.ajax({
        type:'GET',
        url: '/accessriestyp_mast/'+accessriestypid,
        dataType:'json',
        success: function(response) {
            if(response['success'] == true) {
                console.log(response);
                var accessriestyp_name = response['accessriestyp'].accessriestyp_name;
                var accessriestyp_code = response['accessriestyp'].accessriestyp_code;
                var accessriestypid = response['accessriestyp']._id;
                $('.accessriestyp_name').val(accessriestyp_name);
                $('.accessriestyp_code').val(accessriestyp_code);
                $('#edit_accessriestyp').show();
                $('#edit').show();
                $('#accessriestyp_add').hide();
                $('#add').hide();
                $("#edit_accessriestyp").attr("action", "/accessriestyp_mast/edit_accessriestyp_mast/" + accessriestypid);
            } else {
                $('.branddanger').html(response['message']);
                $('.branddanger').show();
                $('.brandsuccess').hide();
            }
            $('.loader').hide();
        },
        error: function(err) {
            console.log(err);
        }
    });
});
$(document).on('click', '.delete_accessriestyp', function(){
    $('.loader').show();
    let id = $(this).attr('data-id');
    $.ajax({
        type:'DELETE',
        url: '/accessriestyp_mast/'+id,
        success: function(response) {
            alert('confirm(Are you sure want to delete.)');
            window.location.href='/accessriestyp_mast/accessriestyp_mast';
            $('.loader').hide();
        },
        error: function(err) {
            console.log(err);
        }
    });
});
$(document).on('click', '.edit_accessubtyp', function(){
    var accessubtypid = $(this).attr('data-id');
    // alert(prodtid);
    $('.loader').show();
    $.ajax({
        type:'GET',
        url: '/accessubtyp_mast/'+accessubtypid,
        dataType:'json',
        success: function(response) {
            if(response['success'] == true) {
                console.log(response);
                var accessubtyp_name = response['accessubtyp'].accessubtyp_name;
                var accessubtyp_code = response['accessubtyp'].accessubtyp_code;
                var accessubtypid = response['accessubtyp']._id;
                $('.accessubtyp_name').val(accessubtyp_name);
                $('.accessubtyp_code').val(accessubtyp_code);
                $('#edit_accessubtyp').show();
                $('#edit').show();
                $('#accessubtyp_add').hide();
                $('#add').hide();
                $("#edit_accessubtyp").attr("action", "/accessubtyp_mast/edit_accessubtyp_mast/" + accessubtypid);
            } else {
                $('.branddanger').html(response['message']);
                $('.branddanger').show();
                $('.brandsuccess').hide();
            }
            $('.loader').hide();
        },
        error: function(err) {
            console.log(err);
        }
    });
});
$(document).on('click', '.delete_accessubtyp', function(){
    $('.loader').show();
    let id = $(this).attr('data-id');
    $.ajax({
        type:'DELETE',
        url: '/accessubtyp_mast/'+id,
        success: function(response) {
            alert('confirm(Are you sure want to delete.)');
            window.location.href='/accessubtyp_mast/accessubtyp_mast';
            $('.loader').hide();
        },
        error: function(err) {
            console.log(err);
        }
    });
}); 
$(document).on('click', '.edit_accessories', function(){
    var accessoriesid = $(this).attr('data-id');
    // alert(prodtid);
    $('.loader').show();
    $.ajax({
        type:'GET',
        url: '/accessories_mast/'+accessoriesid,
        dataType:'json',
        success: function(response) {
            if(response['success'] == true) {
                console.log(response);
                var accessubtyp_name = response['accessories'].accessubtyp_name;
                var accessories_desc = response['accessories'].accessories_desc;
                var manufactur_name = response['accessories'].manufactur_name;
                var machine_name = response['accessories'].machine_name;
                var accessoriesmin_stk = response['accessories'].accessoriesmin_stk;
                var accessoriesqty_pen = response['accessories'].accessoriesqty_pen;
                var accessoriesid = response['accessories']._id;
                $('.accessubtyp_name').val(accessubtyp_name);
                $('.accessories_desc').val(accessories_desc);
                $('.manufactur_name').val(manufactur_name);
                $('.machine_name').val(machine_name);
                $('.accessoriesmin_stk').val(accessoriesmin_stk);
                $('.accessoriesqty_pen').val(accessoriesqty_pen);
                $('#edit_accessories').show();
                $('#edit').show();
                $('#accessories_add').hide();
                $('#add').hide();
                $("#edit_accessories").attr("action", "/accessories_mast/edit_accessories_mast/" + accessoriesid);
            } else {
                $('.branddanger').html(response['message']);
                $('.branddanger').show();
                $('.brandsuccess').hide();
            }
            $('.loader').hide();
        },
        error: function(err) {
            console.log(err);
        }
    });
});
$(document).on('click', '.delete_accessories', function(){
    $('.loader').show();
    let id = $(this).attr('data-id');
    $.ajax({
        type:'DELETE',
        url: '/accessories_mast/'+id,
        success: function(response) {
            alert('confirm(Are you sure want to delete.)');
            window.location.href='/accessories_mast/accessories_mast';
            $('.loader').hide();
        },
        error: function(err) {
            console.log(err);
        }
    });
}); 
$(document).on('click', '.edit_machine', function(){
    var machineid = $(this).attr('data-id');
    // alert(prodtid);
    $('.loader').show();
    $.ajax({
        type:'GET',
        url: '/machine_mast/'+machineid,
        dataType:'json',
        success: function(response) {
            if(response['success'] == true) {
                console.log(response);
                var machine_name = response['machine'].machine_name;
                var machine_code = response['machine'].machine_code;
                var machine_manufctur = response['machine'].machine_manufctur;
                var machine_insdt = response['machine'].machine_insdt;
                var machine_cost = response['machine'].machine_cost;
                var machine_maintint = response['machine'].machine_maintint;
                var machine_inscrt = response['machine'].machine_inscrt;
                var filepath = response['machine'].filepath;
                var machine_deprt = response['machine'].machine_deprt;
                var machine_loction = response['machine'].machine_loction;
                var machineid = response['machine']._id;
                $('.machine_name').val(machine_name);
                $('.machine_code').val(machine_code);
                $('.machine_manufctur').val(machine_manufctur);
                $('.machine_insdt').val(machine_insdt);
                $('.machine_cost').val(machine_cost);
                $('.machine_maintint').val(machine_maintint);
                $('.machine_inscrt').val(machine_inscrt);
                $('.edit_filename').val(filepath);
                $('.edit_machine_img').attr("src",filepath);
                $('.machine_deprt').val(machine_deprt);
                $('.machine_loction').val(machine_loction);
                $('#edit_machine').show();
                $('#edit').show();
                $('#machine_add').hide();
                $('#add').hide();
                $("#edit_machine").attr("action", "/machine_mast/edit_machine_mast/" + machineid);
            } else {
                $('.branddanger').html(response['message']);
                $('.branddanger').show();
                $('.brandsuccess').hide();
            }
            $('.loader').hide();
        },
        error: function(err) {
            console.log(err);
        }
    });
});



               
$(document).on('click', '.delete_machine', function(){
    $('.loader').show();
    let id = $(this).attr('data-id');
    $.ajax({
        type:'DELETE',
        url: '/machine_mast/'+id,
        success: function(response) {
            alert('confirm(Are you sure want to delete.)');
            window.location.href='/machine_mast/machine_mast';
            $('.loader').hide();
        },
        error: function(err) {
            console.log(err);
        }
    });
}); 
$(document).on('click', '.edit_departmnt', function(){
    var departmntid = $(this).attr('data-id');
    // alert(prodtid);
    $('.loader').show();
    $.ajax({
        type:'GET',
        url: '/departmnt_mast/'+departmntid,
        dataType:'json',
        success: function(response) {
            if(response['success'] == true) {
                console.log(response);
                var departmnt_name = response['departmnt'].departmnt_name;
                var departmnt_jbordr = response['departmnt'].departmnt_jbordr;
                var departmnt_dflt = response['departmnt'].departmnt_dflt;
                var departmnt_invreqrmnt = response['departmnt'].departmnt_invreqrmnt;
                var machine_group = response['departmnt'].machine_group;
                var departmntid = response['departmnt']._id;
                var html;
                for (let index = 0; index < machine_group.length; index++){
                        var machine = machine_group[index];
                        console.log(machine);
                        html = '<div class="machine_variation_wrapper" id="machine_group_var-'+index+'">';
                            html += '<label class="col-md-4">Machine Name</label><div class="col-md-5"><input name="machine_group['+index+'][departmnt_mechnenm]" class="form-control departmnt_mechnenm" value="'+machine.departmnt_mechnenm+'" type="text"></div>';
                            
                            html +='<div class="col-md-3">';
                            html += ' <a data-repeater-delete="'+index+'" class="outer-delete-btn"" style="cursor:pointer;"><i class="fa fa-times" style="font-size: 25px;color: red;"></i></a> ';
                                
                            html += '</div></div>';
                            $('.machine_variaton').append(html);
                           
                    } 
                $('.departmnt_name').val(departmnt_name);
                $('.departmnt_jbordr').val(departmnt_jbordr);
                $('.departmnt_dflt').val(departmnt_dflt);
                $('.departmnt_invreqrmnt').val(departmnt_invreqrmnt);
                $('#edit_departmnt').show();
                $('#edit').show();
                $('#departmnt_add').hide();
                $('#add').hide();
                $("#edit_departmnt").attr("action", "/departmnt_mast/edit_departmnt_mast/" + departmntid);
            } else {
                $('.branddanger').html(response['message']);
                $('.branddanger').show();
                $('.brandsuccess').hide();
            }
            $('.loader').hide();
        },
        error: function(err) {
            console.log(err);
        }
    });
}); 
$(document).on("click", ".outer-add-btn", function() {
    var parent_id = $('.inner-add-btn:last').prop('id');
    var main_loop_id  = 0;
    $( ".machine_variation_wrapper").each(function( i, val ) {
        main_loop_id++;
    });
    var machine_mast = '<div class="machine_variation_wrapper" id="machine_variation_wrapper-'+main_loop_id+'"><div class="machine_variaton_wrapper" id="variation-row-'+main_loop_id+'"><label class="col-md-4">Machine Name</label><div class="col-md-5"><input name="machine_group['+main_loop_id+'][departmnt_mechnenm]" class="form-control departmnt_mechnenm"  type="text"></div><div class="col-md-3"><a data-repeater-delete="inner-field-'+main_loop_id+'" data-brand-index="'+main_loop_id+'" class="inner-delete-btn" style="cursor:pointer;"><i class="fa fa-times" style="font-size: 25px;color: red;"></i></a></div></div></div></div>';
    $(".machine_variaton").append(machine_mast);
});

$(document).on("click", ".outer-delete-btn", function(){
    alert('Are you sure you want to delete this element');
    var brandIndex = $(this).attr('data-repeater-delete');
    var parent_id = $(this).closest('.machine_variation_wrapper').prop('id');
    $("#"+parent_id).remove();
    $('#inner-btn-'+brandIndex).remove();
});
$(document).on("click", ".inner-delete-btn", function(){
    alert('Are you sure you want to delete this element');
    var parent_id = $(this).closest('.machine_variation_wrapper').prop('id');
    $("#"+parent_id).remove();
});     
$(document).on('click', '.delete_departmnt', function(){
    $('.loader').show();
    let id = $(this).attr('data-id');
    $.ajax({
        type:'DELETE',
        url: '/departmnt_mast/'+id,
        success: function(response) {
            alert('confirm(Are you sure want to delete.)');
            window.location.href='/departmnt_mast/departmnt_mast';
            $('.loader').hide();
        },
        error: function(err) {
            console.log(err);
        }
    });
}); 
var counter = 1;
var member = counter + 1;
var limit = 10;

$(document).on('click', '.addInput', function()
{
//    alert(counter);
  if (counter == limit)
  {
    alert("You have reached the limit of adding " + counter + " inputs");
  }
  else
  {
    var newdiv = document.createElement('div');
    var new_div = "<div class='machine_wrapper' id='rohit"+counter+"'><div class='form-group'><label class='col-md-4'>Machine Name</label><div class='col-md-7'><input type='number' name='machine_group["+counter+"][departmnt_mechnenm]' id='wght_min"+counter+"' placeholder='Machine Name' class='form-control'  required></div><div class='col-md-1'><a data-repeater-delete='inner-field-"+counter+"' data-brand-index='"+counter+"' class='machine-delete-btn' style='cursor:pointer;'><i class='fa fa-times' style='font-size: 20px;color: red;margin-left:-18px;'></i></a></div></div>";
    // document.getElementById(divName).appendChild(newdiv);
    $(new_div).insertBefore("#insert_div");
    counter++;
    member++;

  } 
});
$(document).on("click", ".machine-delete-btn", function(){
    alert('Are you sure you want to delete this element');
    var parent_id = $(this).closest('.machine_wrapper').prop('id');
    $("#"+parent_id).remove();
});
var counter = 1;
var member = counter + 1;
var limit = 10;

$(document).on('click', '.addMachine', function()
{
//    alert(counter);
  if (counter == limit)
  {
    alert("You have reached the limit of adding " + counter + " inputs");
  }
  else
  {
    var newdiv = document.createElement('div');
    var new_div = "<div class='machine_wrapper' id='rohit"+counter+"'> <div class='form-group'><div class='col-md-3'> "+this.party_name+"</div><div class='col-md-3'><input type='text' class='form-control' name='departmnt_name' id='departmnt_name' placeholder='Department Name'></div><div class='col-md-3'><select class='form-control departmnt_invreqrmnt' name='departmnt_invreqrmnt' id='departmnt_invreqrmnt'><option value='Y'>Y</option><option value='N'>N</option></select></div><div class='col-md-3'><input type='text' class='form-control' name='departmnt_name' id='departmnt_name' placeholder='Department Name'></div></div><a data-repeater-delete='inner-field-"+counter+"' data-brand-index='"+counter+"' class='machine-delete-btn' style='cursor:pointer;'><i class='fa fa-times' style='font-size: 20px;color: red;margin-left:-18px;'></i></a></div>";
    // document.getElementById(divName).appendChild(newdiv);
    $(new_div).insertBefore("#machine_div");
    counter++;
    member++;

  } 
});