var lstdx ;
var lstidx ;
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
    $( "#filterstartdateup" ).datepicker({
        changeMonth: true,
        changeYear: true,
        dateFormat: 'dd/mm/yy'
    });
    $( "#filterenddateup" ).datepicker({
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
$(document).ready(function() {
    $('table.display').DataTable();
} );
$(document).ready(function () {   
    var table;
    table = jQuery('.example').DataTable({
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
            $('.example').DataTable().destroy();
            table = '';
            table = jQuery('.example').DataTable({
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
// $(document).on("change", "#countryid", function() {
//     $('.loader').show(); 
//     var countryID =  $("#countryid option:selected").attr("data-country");
//     alert(countryID);
//     $.ajax({
//         type:'GET',
//         url: '/city_mast/stateid',
//         dataType:'json',
//         data:
//         {
//             id: countryID
//         },
//         success: function(data) {
//             if( data['success'] ) {
//                 console.log(data['success']);
//                 var statArray = data['state'];
//                 alert(statArray);
//                 console.log(statArray);
//                 var i;
//                 var result = '<select class="form-control" name="state_name" id="state_name">';
//                 $.each(statArray, function( index, value ) {
//                     alert(statArray);
//                     result += '<option value="'+statArray._id+'">'+statArray.state_name+'</option>';
//                  });
//                 result += '</select>';
//                 $('.state_name_div').html(result);
//                 $('.loader').hide();
//             }
//         }
//     });
// });
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
                var accestyp_name = response['accessories'].accestyp_name;
                var accessubtyp_name = response['accessories'].accessubtyp_name;
                var accessories_desc = response['accessories'].accessories_desc;
                var manufactur_name = response['accessories'].manufactur_name;
                var machine_name = response['accessories'].machine_name;
                var accessoriesmin_stk = response['accessories'].accessoriesmin_stk;
                var accessoriesqty_pen = response['accessories'].accessoriesqty_pen;
                var accessoriesid = response['accessories']._id;
                $('.accestyp_name').val(accestyp_name);
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
                $('.vehicle_nofaxels').val(filepath);
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
                departmnt = response['depart'];
                machine = response['machine'];
                console.log(machine);
                var departmnt_name = response['departmnt'].departmnt_name;
                var departmnt_jbordr = response['departmnt'].departmnt_jbordr;
                var departmnt_dflt = response['departmnt'].departmnt_dflt;
                var departmnt_invreqrmnt = response['departmnt'].departmnt_invreqrmnt;
                var machine_group = response['departmnt'].machine_group;
                var departmntid = response['departmnt']._id;
                var dprtmnt_group = response['departmnt'].dprtmnt_group;
                var html;
                for (let index = 0; index < machine_group.length; index++){
                        // var machine = machine_group[index];
                        html = '<div class="machine_variation_wrapper" id="machine_group_var-'+index+'">';
                            html += '<div class="box-body" style="margin-bottom: -28px;"><div class="form-group"><input type="hidden" name="cntr'+index+'" value="'+index+'" id=cntr"'+index+'"><label class="col-md-4">Machine Name</label><div class="col-md-7"><select class="form-control " name="machine_group['+index+'][departmnt_mechnenm]" id="departmnt_nameone"><option value="">Select Machine</option>';
                            for(m = 0; m < machine.length; m++) {
                                if(machine_group[index]['departmnt_mechnenm']=machine[m]['_id'])
                                {
                                    html += "<option value='"+machine[m]['_id']+"' selected>"+machine[m]['machine_name']+"</option>";
                                }
                                
                                else
                                {
                                    html += "<option value='"+machine[m]['_id']+"'>"+machine[m]['machine_name']+"</option>";
                                }
                            }
                            html +='</select></div><div class="col-md-1">';
                            if(index != 0) {
                            html += '<a data-repeater-delete="'+index+'" class="outer-delete-btn"" style="cursor:pointer;"><i class="fa fa-times" style="font-size: 20px;margin-left: -18px;color: red;"></i></a> ';
                            }   
                            html += '</div></div></div></div>';
                            $('.machine_variaton').append(html);
                           
                    } 
                    for (let d = 0; d < dprtmnt_group.length; d++){
                        var dprtmnt = dprtmnt_group[d];
                        html = '<div class="deprt_vari_wrapper" id="deprt_group_var-'+d+'"><div class="col-md-3"><input type="hidden" name="contrl'+d+'" value='+d+' id="cntrtol'+d+'"><b>Department</b><select class="form-control " name="dprtmnt_group['+d+'][departmnt_nameone]" id="departmnt_nameone" required="">';
                        for(j = 0; j < departmnt.length; j++) {
                            if(dprtmnt_group[d]['departmnt_nameone']==departmnt[j]['_id'])
                            {
                                html += "<option value='"+departmnt[j]['_id']+"' selected>"+departmnt[j]['departmnt_name']+"</option>";
                            }
                            
                            else
                            {
                                html += "<option value='"+departmnt[j]['_id']+"'>"+departmnt[j]['departmnt_name']+"</option>";
                            }
                        }
                        html +='</select></div><div class="col-md-2"><b>Order</b><input type="text" class="form-control" name="dprtmnt_group['+d+'][departmnt_ordr]" value="'+dprtmnt.departmnt_ordr+'" id="departmnt_ordr" placeholder="Order" style="width: 72px;"></div><div class="col-md-3"><b>Dependancy </b><select class="form-control departmnt_depency" name="dprtmnt_group['+d+'][departmnt_depency]" id="departmnt_depency"><option value="'+dprtmnt.departmnt_depency+'">'+dprtmnt.departmnt_depency+'</option><option value="Y">Y</option><option value="N">N</option></select></div><div class="col-md-3"><b>Department</b><select class="form-control departmnt_nametwo" name="dprtmnt_group['+d+'][departmnt_nametwo]" id="departmnt_nametwo">';
                        for(j = 0; j < departmnt.length; j++) {
                            if(dprtmnt_group[d]['departmnt_nametwo']==departmnt[j]['_id'])
                            {
                                html += "<option value='"+departmnt[j]['_id']+"' selected>"+departmnt[j]['departmnt_name']+"</option>";
                            }
                            
                            else
                            {
                                html += "<option value='"+departmnt[j]['_id']+"'>"+departmnt[j]['departmnt_name']+"</option>";
                            }
                        }
                        html +="</select></div>";
                        html +='<div class="col-md-1">';
                        if(d != 0) {
                             html +='<a data-repeater-delete="'+d+'" class="deprt-delete-btn"" style="cursor:pointer;"><i class="fa fa-times" style="font-size: 20px;margin-left: -18px;margin-top: 26px;color: red;"></i></a>';
                        }
                        html +='</div></div>';
                     $('.departmnt_wrapper').append(html);
                           
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
$(document).on("click", ".deprt-delete-btn", function(){
    alert('Are you sure you want to delete this element');
    var brandIndex = $(this).attr('data-repeater-delete');
    var parent_id = $(this).closest('.deprt_vari_wrapper').prop('id');
    $("#"+parent_id).remove();
    $('#inner-btn-'+brandIndex).remove();
});
$(document).on("click", ".outer-add-btn", function() {
    var parent_id = $('.inner-add-btn:last').prop('id');
    var main_loop_id  = 1;
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

$(document).on('click', '.addMachine', function()
{
//    alert(counter);
  if (counter == limit)
  {
    alert("You have reached the limit of adding " + counter + " inputs");
  }
  else
  {
     var machine = "";
    $.ajax({
        type:'GET',
        url: '/departmnt_mast/machinename',
        dataType:'json',
        success: function(data) {
            if( data['success'] ) {
                machine = data['machine'];
                console.log(machine);
                var newdiv = document.createElement('div');
                var new_div = "<div class='machine_wrapper' id='rohit"+counter+"'><div class='form-group'><label class='col-md-4'>Machine Name</label><div class='col-md-7'><select class='form-control' name='machine_group["+counter+"][departmnt_mechnenm]' id='wght_min"+counter+"'><option value=''>----Select Machine----</option>";
                for(j = 0; j < machine.length; j++) {
                    new_div += "<option value='"+machine[j]['_id']+"'>"+machine[j]['machine_name']+"</option>";
                   }
                new_div +="</select></div><div class='col-md-1'><a data-repeater-delete='inner-field-"+counter+"' data-brand-index='"+counter+"' class='machine-delete-btn' style='cursor:pointer;'><i class='fa fa-times' style='font-size: 20px;color: red;margin-left:-18px;'></i></a></div></div>";
                // document.getElementById(divName).appendChild(newdiv);
                $(new_div).insertBefore("#insert_div");
                counter++;
                member++;

            }
        }
    });

  } 
});
var countup = 1;
var member = countup + 1;
var limit = 10;

$(document).on('click', '.addMachineupdate', function()
{
    lstidx = $("input[name*='cntr']").length;
    countup=lstidx;
  if (countup == limit)
  {
    alert("You have reached the limit of adding " + countup + " inputs");
  }
  else
  {
    var machine = "";
    $.ajax({
        type:'GET',
        url: '/departmnt_mast/machinename',
        dataType:'json',
        success: function(data) {
            if( data['success'] ) {
                machine = data['machine'];
                console.log(machine);
                var newdiv = document.createElement('div');
                var new_div = "<div class='machine_wrapper' id='rohit"+countup+"'><input type='hidden' name='cntr"+lstidx+"' value="+lstidx+" id='cntr"+countup+"'><div class='form-group'><label class='col-md-4'>Machine Name</label><div class='col-md-7'><select class='form-control' name='machine_group["+countup+"][departmnt_mechnenm]' id='departmnt_mechnenm"+countup+"'><option value=''>----Select Machine----</option>";
                for(j = 0; j < machine.length; j++) {
                    new_div += "<option value='"+machine[j]['_id']+"'>"+machine[j]['machine_name']+"</option>";
                   }
                new_div +="</select></div><div class='col-md-1'><a data-repeater-delete='inner-field-"+countup+"' data-brand-index='"+countup+"' class='machine-delete-btn' style='cursor:pointer;'><i class='fa fa-times' style='font-size: 20px;color: red;margin-left:-18px;'></i></a></div></div>";
                // document.getElementById(divName).appendChild(newdiv);
                $(new_div).insertBefore("#insert_divup");
                countup++;
                member++;
            }
        }
    });

  } 
});
$(document).on("click", ".machine-delete-btn", function(){
    alert('Are you sure you want to delete this element');
    var parent_id = $(this).closest('.machine_wrapper').prop('id');
    $("#"+parent_id).remove();
});
var counterdprt = 1;
var membedprt = counterdprt + 1;
var limit = 10;

$(document).on('click', '.adddupdatedprt', function()
{
    lstdx = $("input[name*='contrl']").length;
    counterdprt=lstdx;
  if (counterdprt == limit)
  {
    alert("You have reached the limit of adding " + counterdprt + " inputs");
  }
  else
  {
    var departmnt = "";
    $.ajax({
        type:'GET',
        url: '/departmnt_mast/departmntname',
        dataType:'json',
        success: function(data) {
            if( data['success'] ) {
                departmnt = data['departmnt'];
                console.log(departmnt);
                var newdiv = document.createElement('div');
               var new_div = "<div class='machine_wrapper' id='rohit"+counterdprt+"'><input type='hidden' name='contrl"+counterdprt+"' value="+counterdprt+" id='cntrtol"+counterdprt+"'><div class='form-group'><div class='col-md-3'><select class='form-control' name='dprtmnt_group["+counterdprt+"][departmnt_nameone]' id='departmnt_nameone' required=''>";
               for(j = 0; j < departmnt.length; j++) {
                new_div += "<option value='"+departmnt[j]['_id']+"'>"+departmnt[j]['departmnt_name']+"</option>";
               }
               new_div += "</select></div><div class='col-md-2'><input type='text' class='form-control' name='dprtmnt_group["+counterdprt+"][departmnt_ordr]' id='departmnt_ordr' placeholder='Order' style='width: 72px;'></div><div class='col-md-3'><select class='form-control departmnt_depency' name='dprtmnt_group["+counterdprt+"][departmnt_depency]' id='departmnt_depency'><option value='Y'>Y</option><option value='N'>N</option></select></div><div class='col-md-3'><select class='form-control' name='dprtmnt_group["+counterdprt+"][departmnt_nametwo]' id='departmnt_nametwo' required=''>";
               for(j = 0; j < departmnt.length; j++) {
                new_div += "<option value='"+departmnt[j]['_id']+"'>"+departmnt[j]['departmnt_name']+"</option>";
               }
               new_div +="</select></div><div class='col-md-1'><a data-repeater-delete='inner-field-"+counterdprt+"' data-brand-index='"+counterdprt+"' class='machine-delete-btn' style='cursor:pointer;'><i class='fa fa-times' style='font-size: 20px;color: red;margin-left:-18px;margin-top: 7px;'></i></a></div></div>";
               // document.getElementById(divName).appendChild(newdiv);
                 $(new_div).insertBefore("#adddprt_divup");
                counterdprt++;
                membedprt++;

            }
        }
    });

  } 
});
var counter = 1;
var membedeprt = counter + 1;
var limit = 10;

$(document).on('click', '.addDepartmnt', function()
{
//    alert(counter);
  if (counter == limit)
  {
    alert("You have reached the limit of adding " + counter + " inputs");
  }
  else
  {
    var departmnt = "";
    $.ajax({
        type:'GET',
        url: '/departmnt_mast/departmntname',
        dataType:'json',
        success: function(data) {
            if( data['success'] ) {
                departmnt = data['departmnt'];
                console.log(departmnt);
                var newdiv = document.createElement('div');
               var new_div = "<div class='machine_wrapper' id='rohit"+counter+"'> <div class='form-group'><div class='col-md-3'><select class='form-control' name='dprtmnt_group["+counter+"][departmnt_nameone]' id='departmnt_nameone' required=''>";
               for(j = 0; j < departmnt.length; j++) {
                new_div += "<option value='"+departmnt[j]['_id']+"'>"+departmnt[j]['departmnt_name']+"</option>";
               }
               new_div += "</select></div><div class='col-md-2'><input type='text' class='form-control' name='dprtmnt_group["+counter+"][departmnt_ordr]' id='departmnt_ordr' placeholder='Order' style='width: 72px;'></div><div class='col-md-3'><select class='form-control departmnt_depency' name='dprtmnt_group["+counter+"][departmnt_depency]' id='departmnt_depency'><option value='Y'>Y</option><option value='N'>N</option></select></div><div class='col-md-3'><select class='form-control' name='dprtmnt_group["+counter+"][departmnt_nametwo]' id='departmnt_nametwo' required=''>";
               for(j = 0; j < departmnt.length; j++) {
                new_div += "<option value='"+departmnt[j]['_id']+"'>"+departmnt[j]['departmnt_name']+"</option>";
               }
               new_div +="</select></div><div class='col-md-1'><a data-repeater-delete='inner-field-"+counter+"' data-brand-index='"+counter+"' class='machine-delete-btn' style='cursor:pointer;'><i class='fa fa-times' style='font-size: 20px;color: red;margin-left:-18px;'></i></a></div></div>";
               // document.getElementById(divName).appendChild(newdiv);
                 $(new_div).insertBefore("#machine_div");
                counter++;
                membedeprt++;

            }
        }
    });

  } 
});
var counterprty = 1;
var membertoldiv = counterprty + 1;
var limit = 10;

$(document).on('click', '.addTolerance', function()
{
  if (membertoldiv == limit)
  {
    alert("You have reached the limit of adding " + membertoldiv + " inputs");
  }
  else
  {
    var product = "";
    $.ajax({
        type:'GET',
        url: '/party_mast/prdttypname',
        dataType:'json',
        success: function(data) {
            if( data['success'] ) {
                product = data['product'];
                console.log(product);
                var newdiv = document.createElement('div');
               var new_div = "<div class='tolrance_wrapper' id='rohit"+membertoldiv+"'> <div class='form-group'><div class='col-md-3'><select class='form-control' name='tolrance_group["+membertoldiv+"][jobstyl]' id='jobstyl'>";
               for(j = 1; j < product.length; j++) {
                new_div += "<option value='"+product[j]['_id']+"'>"+product[j]['prdt_typ_name']+"</option>";
               }
               new_div += "</select></div><div class='col-md-2'><input type='text' class='form-control' name='tolrance_group["+membertoldiv+"][limitfrom]' id='limitfrom' placeholder='Limit From' style='width: 72px;'></div><div class='col-md-3'><input type='text' class='form-control' name='tolrance_group["+membertoldiv+"][limitto]' id='limitto' placeholder='Limit To'></div><div class='col-md-3'><input type='text' class='form-control' name='tolrance_group["+membertoldiv+"][slab]' id='slab' placeholder='Slab[Nos]'></div>";
              
               new_div +="<div class='col-md-1'><a data-repeater-delete='inner-field-"+membertoldiv+"' data-brand-index='"+membertoldiv+"' class='tolerance-delete-btn' style='cursor:pointer;'><i class='fa fa-times' style='font-size: 20px;color: red;margin-left:-18px;'></i></a></div></div>";
               // document.getElementById(divName).appendChild(newdiv);
                 $(new_div).insertBefore("#tolrance_div");
                membertoldiv++;
                counterprty++;

            }
        }
    });

  } 
});
$(document).on("click", ".tolerance-delete-btn", function(){
    alert('Are you sure you want to delete this element');
    var parent_id = $(this).closest('.tolrance_wrapper').prop('id');
    $("#"+parent_id).remove();
});
var countertol = 1;
var member = countertol + 1;
var limit = 10;

$(document).on('click', '.addTo', function()
{
//    alert(counter);
  if (member == limit)
  {
    alert("You have reached the limit of adding " + member + " inputs");
  }
  else
  {
    var product = "";
    $.ajax({
        type:'GET',
        url: '/party_mast/prdttypname',
        dataType:'json',
        success: function(data) {
            if( data['success'] ) {
                product = data['product'];
                console.log(product);
                var newdiv = document.createElement('div');
               var new_div = "<div class='tol_wrapper' id='rohit"+member+"'> <div class='form-group'><div class='col-md-3'><select class='form-control' name='tole_group["+member+"][jobstyltwo]' id='jobstyltwo'>";
               for(j = 1; j < product.length; j++) {
                new_div += "<option value='"+product[j]['_id']+"'>"+product[j]['prdt_typ_name']+"</option>";
               }
               new_div += "</select></div><div class='col-md-2'><input type='text' class='form-control' name='tole_group["+member+"][limitfromtwo]' id='limitfromtwo' placeholder='Limit From' style='width: 72px;'></div><div class='col-md-3'><input type='text' class='form-control' name='tole_group["+member+"][limittotwo]' id='limittotwo' placeholder='Limit To'></div><div class='col-md-3'><input type='text' class='form-control' name='tole_group["+member+"][slabtwo]' id='slabtwo' placeholder='Slab%'></div>";
              
               new_div +="<div class='col-md-1'><a data-repeater-delete='inner-field-"+member+"' data-brand-index='"+member+"' class='tole-delete-btn' style='cursor:pointer;'><i class='fa fa-times' style='font-size: 20px;color: red;margin-left:-18px;'></i></a></div></div>";
               // document.getElementById(divName).appendChild(newdiv);
                 $(new_div).insertBefore("#tol_div");
                member++;
                member++;

            }
        }
    });

  } 
});
$(document).on("click", ".tole-delete-btn", function(){
    alert('Are you sure you want to delete this element');
    var parent_id = $(this).closest('.tol_wrapper').prop('id');
    $("#"+parent_id).remove();
});


$(document).on('click', '.edit_party', function(){
    var partyid = $(this).attr('data-id');
    // alert(prodtid);
    $('.loader').show();
    $.ajax({
        type:'GET',
        url: '/party_mast/'+partyid,
        dataType:'json',
        success: function(response) {
            if(response['success'] == true) {
                console.log(response);
                product = response['product'];
                console.log(product);
                var party_code = response['party'].party_code;
                var party_name = response['party'].party_name;
                var party_addrss1 = response['party'].party_addrss1;
                var party_addrss2 = response['party'].party_addrss2;
                var part_city = response['party'].part_city;
                var partyid = response['party']._id;
                var party_mobno = response['party'].party_mobno;
                var party_contprsn = response['party'].party_contprsn;
                var party_prttyp = response['party'].party_prttyp;
                var partysndcrd = response['party'].partysndcrd;
                var partylckcrd = response['party'].partylckcrd;
                var partyapproval = response['party'].partyapproval;
                var partyapproval = response['party'].partyapproval;
                var tolrance_group = response['party'].tolrance_group;
                var tole_group = response['party'].tole_group;
                var filepath = response['party'].filepath;
                var party_fixsheet = response['party'].party_fixsheet;
                var html;
                for (let t = 1; t < tolrance_group.length; t++){
                    var tolrnce = tolrance_group[t];
                    html = '<div class="tolerance-wrapper" id="tolerance_group_var-'+t+'"><input type="hidden" name="cntr'+t+'" value='+t+' id="cntr'+t+'"><div class="col-md-3"><b>Job Style</b><select class="form-control " name="tolrance_group['+t+'][jobstyl]" id="jobstyl">';
                    for(j = 0; j < product.length; j++) {
                        if(tolrance_group[t]['jobstyl']==product[j]['_id'])
                        {
                         html += "<option value='"+product[j]['_id']+"' selected>"+product[j]['prdt_typ_name']+"</option>";
                        }
                        else
                        {
                            html += "<option value='"+product[j]['_id']+"'>"+product[j]['prdt_typ_name']+"</option>";  
                        }
                    }
                    html +='</select></div><div class="col-md-2"><b>From</b><input type="text" class="form-control" name="tolrance_group['+t+'][limitfrom]" value="'+tolrnce.limitfrom+'" id="limitfrom" placeholder="Order" style="width: 72px;"></div><div class="col-md-3"><b>To </b><input type="text" class="form-control" name="tolrance_group['+t+'][limitto]" value="'+tolrnce.limitto+'" id="limitto"></div><div class="col-md-3"><b>Slab[Nos]</b><input type="text" class="form-control" name="tolrance_group['+t+'][slab]" value="'+tolrnce.slab+'" id="slab"></div>';
                    if(t != 1) {
                    html +='<div class="col-md-1"><a data-repeater-delete="'+t+'" class="toleranceupin-delete-btn" style="cursor:pointer;"><i class="fa fa-times" style="font-size: 20px;margin-left: -18px;color: red;margin-top: 27px;"></i></a> </div></div>';
                }
                 $('.tolerance_div').append(html);
                       
                } 
                    for (let d = 1; d < tole_group.length; d++){
                        var tol = tole_group[d];
                        html = '<div class="tole-wrapper" id="tole_group_var-'+d+'"><input type="hidden" name="contrl'+d+'" value='+d+' id="cntrtol'+d+'"> <div class="col-md-3"><b>Job Style</b><select class="form-control " name="tole_group['+d+'][jobstyltwo]" id="jobstyltwo">';
                        for(j = 0; j < product.length; j++) {
                            if(tole_group[d]['jobstyltwo']==product[j]['_id'])
                            {
                             html += "<option value='"+product[j]['_id']+"' selected>"+product[j]['prdt_typ_name']+"</option>";
                            }
                            else
                            {
                                html += "<option value='"+product[j]['_id']+"'>"+product[j]['prdt_typ_name']+"</option>";  
                            }
                        }
                    html +='</select></div><div class="col-md-2"><b>From</b><input type="text" class="form-control" name="tole_group['+d+'][limitfromtwo]" value="'+tol.limitfromtwo+'" id="limitfromtwo" style="width: 72px;"></div><div class="col-md-3"><b>To </b><input type="text" class="form-control" name="tole_group['+d+'][limittotwo]" value="'+tol.limittotwo+'" id="limittotwo"></div><div class="col-md-3"><b>Slab[Nos]</b><input type="text" class="form-control" name="tole_group['+d+'][slabtwo]" value="'+tol.slabtwo+'" id="slabtwo"></div>';
                    if(d != 1) {
                    html +='<div class="col-md-1"><a data-repeater-delete="'+d+'" class="toleupe-delete-btn"" style="cursor:pointer;"><i class="fa fa-times" style="font-size: 20px;margin-left: -18px;color: red;margin-top: 27px;"></i></a> </div></div>';
                }
                     $('.tol_div').append(html);
                           
                    } 
                $('.party_code').val(party_code);
                $('.party_name').val(party_name);
                $('.party_addrss1').val(party_addrss1);
                $('.party_addrss2').val(party_addrss2);
                $('.part_city').val(part_city);
                $('.party_mobno').val(party_mobno);
                $('.party_contprsn').val(party_contprsn);
                $('.party_prttyp').val(party_prttyp);
                if(partysndcrd=='Y')
                {
                    $('.partysndcrd').prop('checked', true);
                }
                else{
                    $('.partysndcrd').prop('checked', false);
                }
                if(partylckcrd=='Y')
                {
                    $('.partylckcrd').prop('checked', true);
                }
                else
                {
                    $('.partylckcrd').prop('checked', false);
                }
                if(partyapproval=='Y')
                {
                    $('.partyapproval').prop('checked', true);
                }
                else
                {
                    $('.partyapproval').prop('checked', false);
                }
                $('.party_fixsheet').val(party_fixsheet);
                $('.edit_party_img').attr("src",filepath);
                $('.edit_filename').val(filepath);
                $('#edit_party').show();
                $('#edit').show();
                $('#party_add').hide();
                $('#add').hide();
                $("#edit_party").attr("action", "/party_mast/edit_party_mast/" + partyid);
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
$(document).on("click", ".toleranceupin-delete-btn", function(){
    alert('Are you sure you want to delete this element');
    var brandIndex = $(this).attr('data-repeater-delete');
    var parent_id = $(this).closest('.tolerance-wrapper').prop('id');
    $("#"+parent_id).remove();
    $('#inner-btn-'+brandIndex).remove();
});
$(document).on("click", ".toleupe-delete-btn", function(){
    alert('Are you sure you want to delete this element');
    var brandIndex = $(this).attr('data-repeater-delete');
    var parent_id = $(this).closest('.tole-wrapper').prop('id');
    $("#"+parent_id).remove();
    $('#inner-btn-'+brandIndex).remove();
});
$(document).on('click', '.delete_party', function(){
    $('.loader').show();
    let id = $(this).attr('data-id');
    $.ajax({
        type:'DELETE',
        url: '/party_mast/'+id,
        success: function(response) {
            alert('confirm(Are you sure want to delete.)');
            window.location.href='/party_mast/party_mast';
            $('.loader').hide();
        },
        error: function(err) {
            console.log(err);
        }
    });
}); 

var counterprtyup =1;
var membertolr = counterprtyup + 1;
var limit = 10;

$(document).on('click', '.addToleranceupdate', function()
{
    lstidx = $("input[name*='cntr']").length;
    membertolr=lstidx;
  if (membertolr == limit)
  {
    alert("You have reached the limit of adding " + membertolr + " inputs");
  }
  else
  {
    var product = "";
    $.ajax({
        type:'GET',
        url: '/party_mast/prdttypname',
        dataType:'json',
        success: function(data) {
            if( data['success'] ) {
                product = data['product'];
                console.log(product);
                var newdiv = document.createElement('div');
               var new_div = "<div class='tolrance_wrapper' id='rohit"+membertolr+"'><input type='hidden' name='cntr"+lstidx+"' value="+lstidx+" id='cntr"+lstidx+"'> <div class='form-group'><div class='col-md-3'><select class='form-control' name='tolrance_group["+membertolr+"][jobstyl]' id='jobstyl'>";
               for(j = 1; j < product.length; j++) {
                new_div += "<option value='"+product[j]['_id']+"'>"+product[j]['prdt_typ_name']+"</option>";
               }
               new_div += "</select></div><div class='col-md-2'><input type='text' class='form-control' name='tolrance_group["+membertolr+"][limitfrom]' id='limitfrom' placeholder='Limit From' style='width: 72px;'></div><div class='col-md-3'><input type='text' class='form-control' name='tolrance_group["+membertolr+"][limitto]' id='limitto' placeholder='Limit To'></div><div class='col-md-3'><input type='text' class='form-control' name='tolrance_group["+membertolr+"][slab]' id='slab' placeholder='Slab[Nos]'></div>";
              
               new_div +="<div class='col-md-1'><a data-repeater-delete='inner-field-"+membertolr+"' data-brand-index='"+membertolr+"' class='toleranceup-delete-btn' style='cursor:pointer;'><i class='fa fa-times' style='font-size: 20px;color: red;margin-left:-18px;'></i></a></div></div>";
               // document.getElementById(divName).appendChild(newdiv);<input type='text' name='cntr"+membertolr+"' value="+membertolr+" id='cntr"+membertolr+"'>
                 $(new_div).insertBefore("#tolrance_divupdate");
                membertolr++;
                member++;

            }
        }
    });

  } 
});
$(document).on("click", ".toleranceup-delete-btn", function(){
    alert('Are you sure you want to delete this element');
    var parent_id = $(this).closest('.tolrance_wrapper').prop('id');
    $("#"+parent_id).remove();
});
var countertolup = 1;
var membertol = countertolup + 1;
var limit = 10;

$(document).on('click', '.addToupdate', function()
{
    lstdx = $("input[name*='contrl']").length+1;
   
    membertol=lstdx;
  if (membertol == limit)
  {
    alert("You have reached the limit of adding " + membertol + " inputs");
  }
  else
  {
    var product = "";
    $.ajax({
        type:'GET',
        url: '/party_mast/prdttypname',
        dataType:'json',
        success: function(data) {
            if( data['success'] ) {
                product = data['product'];
                console.log(product);
                var newdiv = document.createElement('div');
               var new_div = "<div class='tol_wrapper' id='rohit"+membertol+"'><input type='hidden' name='contrl"+lstdx+"' value="+lstdx+" id='cntrtol"+lstdx+"'> <div class='form-group'><div class='col-md-3'><select class='form-control' name='tole_group["+membertol+"][jobstyltwo]' id='jobstyltwo'>";
               for(j = 1; j < product.length; j++) {
                new_div += "<option value='"+product[j]['_id']+"'>"+product[j]['prdt_typ_name']+"</option>";
               }
               new_div += "</select></div><div class='col-md-2'><input type='text' class='form-control' name='tole_group["+membertol+"][limitfromtwo]' id='limitfromtwo' placeholder='Limit From' style='width: 72px;'></div><div class='col-md-3'><input type='text' class='form-control' name='tole_group["+membertol+"][limittotwo]' id='limittotwo' placeholder='Limit To'></div><div class='col-md-3'><input type='text' class='form-control' name='tole_group["+membertol+"][slabtwo]' id='slabtwo' placeholder='Slab%'></div>";
              
               new_div +="<div class='col-md-1'><a data-repeater-delete='inner-field-"+membertol+"' data-brand-index='"+membertol+"' class='toleup-delete-btn' style='cursor:pointer;'><i class='fa fa-times' style='font-size: 20px;color: red;margin-left:-18px;'></i></a></div></div>";
               // document.getElementById(divName).appendChild(newdiv);
                 $(new_div).insertBefore("#tol_divupdate");
                membertol++;
                countertolup++;

            }
        }
    });

  } 
});
$(document).on("click", ".toleup-delete-btn", function(){
    alert('Are you sure you want to delete this element');
    var parent_id = $(this).closest('.tol_wrapper').prop('id');
    $("#"+parent_id).remove();
});
$(document).on('click', '.edit_party_type_mast', function(){
    var prtyid = $(this).attr('data-id');
    // alert(prodtid);
    $('.loader').show();
    $.ajax({
        type:'GET',
        url: '/party_type_mast/'+prtyid,
        dataType:'json',
        success: function(response) {
            if(response['success'] == true) {
                console.log(response);
                var party_type_name = response['party'].party_type_name;
                var prtyid = response['party']._id;
                $('.party_type_name').val(party_type_name);
                $('#edit_party_type_mast').show();
                $('#edit').show();
                $('#party_type_mast_add').hide();
                $('#add').hide();
                $("#edit_party_type_mast").attr("action", "/party_type_mast/edit_party_type_mast/" + prtyid);
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
$(document).on('click', '.delete_party_type_mast', function(){
    $('.loader').show();
    let id = $(this).attr('data-id');
    $.ajax({
        type:'DELETE',
        url: '/party_type_mast/'+id,
        success: function(response) {
            alert('confirm(Are you sure want to delete.)');
            window.location.href='/party_type_mast/party_type_mast';
            $('.loader').hide();
        },
        error: function(err) {
            console.log(err);
        }
    });
}); 

$(document).on('click', '.edit_supplier', function(){
    var supplierid = $(this).attr('data-id');
    // alert(prodtid);
    $('.loader').show();
    $.ajax({
        type:'GET',
        url: '/supplier_mast/'+supplierid,
        dataType:'json',
        success: function(response) {
            if(response['success'] == true) {
                console.log(response);
                var supplier_name = response['supplier'].supplier_name;
                var supplier_addrss1 = response['supplier'].supplier_addrss1;
                var supplier_addrss2 = response['supplier'].supplier_addrss2;
                var supplier_city = response['supplier'].supplier_city;
                var supplier_mobno = response['supplier'].supplier_mobno;
                var supplier_gstin = response['supplier'].supplier_gstin;
                var supplierid = response['supplier']._id;
                $('.supplier_name').val(supplier_name);
                $('.supplier_addrss1').val(supplier_addrss1);
                $('.supplier_addrss2').val(supplier_addrss2);
                $('.supplier_city').val(supplier_city);
                $('.supplier_mobno').val(supplier_mobno);
                $('.supplier_gstin').val(supplier_gstin);
                $('#edit_supplier').show();
                $('#edit').show();
                $('#supplier_add').hide();
                $('#add').hide();
                $("#edit_supplier").attr("action", "/supplier_mast/edit_supplier_mast/" + supplierid);
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
$(document).on('click', '.delete_supplier', function(){
    $('.loader').show();
    let id = $(this).attr('data-id');
    $.ajax({
        type:'DELETE',
        url: '/supplier_mast/'+id,
        success: function(response) {
            alert('confirm(Are you sure want to delete.)');
            window.location.href='/supplier_mast/supplier_mast';
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

$(document).on('click', '.addLocation', function()
{
//    alert(counter);
  if (counter == limit)
  {
    alert("You have reached the limit of adding " + counter + " inputs");
  }
  else
  {
    var city = "";
    $.ajax({
        type:'GET',
        url: '/product_mast/cityname',
        dataType:'json',
        success: function(data) {
            if( data['success'] ) {
                city = data['city'];
                var newdiv = document.createElement('div');
               var new_div = "<div class='location_wrapper' id='rohit"+counter+"'><div class='form-group'><label class='col-md-4'>Location</label><div class='col-md-7'><select class='form-control' name='location_group["+counter+"][prdt_location]' id='prdt_location' required=''><option value=''>----Select Location----</option>";
               for(j = 0; j < city.length; j++) {
                new_div += "<option value='"+city[j]['_id']+"'>"+city[j]['city_name']+"</option>";
               }
               new_div +="</select></div><div class='col-md-1'><a data-repeater-delete='inner-field-"+counter+"' data-brand-index='"+counter+"' class='location-delete-btn' style='cursor:pointer;'><i class='fa fa-times' style='font-size: 20px;color: red;margin-left:-18px;margin-top: 8px;'></i></a></div></div>";
               $(new_div).insertBefore("#insert_location");
               counter++;
               member++;
            }
        }
    });

  } 
});
$(document).on("click", ".location-delete-btn", function(){
    alert('Are you sure you want to delete this element');
    var parent_id = $(this).closest('.location_wrapper').prop('id');
    $("#"+parent_id).remove();
});
var counterremark = 1;
var memberremark = counter + 1;
var limit = 10;

$(document).on('click', '.addRemark', function()
{
//    alert(counter);
  if (counterremark == limit)
  {
    alert("You have reached the limit of adding " + counterremark + " inputs");
  }
  else
  {
        var newdiv = document.createElement('div');
        var new_div = "<div class='remark_wrapper' id='rohit"+counterremark+"'><div class='form-group'><label class='col-md-4'>Remark</label><div class='col-md-7'><input type='text' class='form-control' name='remark_group["+counterremark+"][remark_name]' id='remark_name' placeholder='Remark'>";
        new_div +="</div><div class='col-md-1'><a data-repeater-delete='inner-field-"+counterremark+"' data-brand-index='"+counterremark+"' class='remark-delete-btn' style='cursor:pointer;'><i class='fa fa-times' style='font-size: 20px;color: red;margin-left:-18px;margin-top: 8px;'></i></a></div></div>";
        $(new_div).insertBefore("#insert_remark");
        counterremark++;
        memberremark++;

  } 
});
$(document).on("click", ".remark-delete-btn", function(){
    alert('Are you sure you want to delete this element');
    var parent_id = $(this).closest('.remark_wrapper').prop('id');
    $("#"+parent_id).remove();
});

$(document).on("click", ".locationview-delete-btn", function(){
    alert('Are you sure you want to delete this element');
    var brandIndex = $(this).attr('data-repeater-delete');
    var parent_id = $(this).closest('.location_variation_row').prop('id');
    $("#"+parent_id).remove();
    $('#inner-btn-'+brandIndex).remove();
});
$(document).on("click", ".remarkview-delete-btn", function(){
    alert('Are you sure you want to delete this element');
    var brandIndex = $(this).attr('data-repeater-delete');
    var parent_id = $(this).closest('.remarkview_wrapper').prop('id');
    $("#"+parent_id).remove();
    $('#inner-btn-'+brandIndex).remove();
});
var counterlocup = 1;
var member = counterlocup + 1;
var limit = 10;

$(document).on('click', '.updateLocation', function()
{
    lstidx = $("input[name*='cont']").length;
    counterlocup=lstidx;
  if (counterlocup == limit)
  {
    alert("You have reached the limit of adding " + counterlocup + " inputs");
  }
  else
  {
    var city = "";
    $.ajax({
        type:'GET',
        url: '/product_mast/cityname',
        dataType:'json',
        success: function(data) {
            if( data['success'] ) {
                city = data['city'];
                var newdiv = document.createElement('div');
               var new_div = "<div class='uplocation_wrapper' id='rohit"+counterlocup+"'><input type='hidden' name='cont"+lstidx+"' value="+lstidx+" id='cont"+lstidx+"'> <div class='form-group'><label class='col-md-4'>Location</label><div class='col-md-7'><select class='form-control' name='location_group["+counterlocup+"][prdt_location]' id='prdt_location' required=''><option value=''>----Select Location----</option>";
               for(j = 0; j < city.length; j++) {
                new_div += "<option value='"+city[j]['_id']+"'>"+city[j]['city_name']+"</option>";
               }
               new_div +="</select></div><div class='col-md-1'><a data-repeater-delete='inner-field-"+counterlocup+"' data-brand-index='"+counterlocup+"' class='uplocation-delete-btn' style='cursor:pointer;'><i class='fa fa-times' style='font-size: 20px;color: red;margin-left:-18px;margin-top: 8px;'></i></a></div></div>";
               $(new_div).insertBefore("#insert_updatelocation");
               counterlocup++;
               member++;
            }
        }
    });

  } 
});
$(document).on("click", ".uplocation-delete-btn", function(){
    alert('Are you sure you want to delete this element');
    var parent_id = $(this).closest('.uplocation_wrapper').prop('id');
    $("#"+parent_id).remove();
});
var counterupdremark = 1;
var memberremark = counter + 1;
var limit = 10;

$(document).on('click', '.addupdateRemark', function()
{
    lstdx = $("input[name*='cntrtol']").length;
    counterupdremark=lstdx;
  if (counterupdremark == limit)
  {
    alert("You have reached the limit of adding " + counterupdremark + " inputs");
  }
  else
  {
        var newdiv = document.createElement('div');
        var new_div = "<div class='remark_wrapper' id='rohit"+counterupdremark+"'><div class='form-group'><input type='hidden' name='cntrtol"+lstdx+"' value="+lstdx+" id='cntrtol"+lstdx+"'><label class='col-md-4'>Remark</label><div class='col-md-7'><input type='text' class='form-control' name='remark_group["+counterupdremark+"][remark_name]' id='remark_name' placeholder='Remark'>";
        new_div +="</div><div class='col-md-1'><a data-repeater-delete='inner-field-"+counterupdremark+"' data-brand-index='"+counterupdremark+"' class='updateremark-delete-btn' style='cursor:pointer;'><i class='fa fa-times' style='font-size: 20px;color: red;margin-left:-18px;margin-top: 8px;'></i></a></div></div>";
        $(new_div).insertBefore("#insert_updateremark");
        counterupdremark++;
        memberremark++;

  } 
});
$(document).on("click", ".updateremark-delete-btn", function(){
    alert('Are you sure you want to delete this element');
    var parent_id = $(this).closest('.remark_wrapper').prop('id');
    $("#"+parent_id).remove();
});

$(document).on('click', '.delete_prodtmast', function(){
    $('.loader').show();
    let id = $(this).attr('data-id');
    $.ajax({
        type:'DELETE',
        url: '/product_mast/'+id,
        success: function(response) {
            alert('confirm(Are you sure want to delete.)');
            window.location.href='/product_mast/product_mast_list';
            $('.loader').hide();
        },
        error: function(err) {
            console.log(err);
        }
    });
});
$(document).on('click', '.edit_driver', function(){
    var driverid = $(this).attr('data-id');
    // alert(prodtid);
    $('.loader').show();
    $.ajax({
        type:'GET',
        url: '/driver_mast/'+driverid,
        dataType:'json',
        success: function(response) {
            if(response['success'] == true) {
                console.log(response);
                var driver_name = response['driver'].driver_name;
                var driver_salary = response['driver'].driver_salary;
                var driverid = response['driver']._id;
                $('.driver_name').val(driver_name);
                $('.driver_salary').val(driver_salary);
                $('#edit_driver').show();
                $('#edit').show();
                $('#driver_add').hide();
                $('#add').hide();
                $("#edit_driver").attr("action", "/driver_mast/edit_driver_mast/" + driverid);
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
$(document).on('click', '.delete_driver', function(){
    $('.loader').show();
    let id = $(this).attr('data-id');
    $.ajax({
        type:'DELETE',
        url: '/driver_mast/'+id,
        success: function(response) {
            alert('confirm(Are you sure want to delete.)');
            window.location.href='/driver_mast/driver_mast';
            $('.loader').hide();
        },
        error: function(err) {
            console.log(err);
        }
    });
}); 
$(document).on('click', '.edit_rackloc', function(){
    var racklocid = $(this).attr('data-id');
    // alert(prodtid);
    $('.loader').show();
    $.ajax({
        type:'GET',
        url: '/rackloc_mast/'+racklocid,
        dataType:'json',
        success: function(response) {
            if(response['success'] == true) {
                console.log(response);
                var rackloc_name = response['rackloc'].rackloc_name;
                var rackloc_rckno = response['rackloc'].rackloc_rckno;
                var rackloc_rowno = response['rackloc'].rackloc_rowno;
                var rackloc_qtycpcaty = response['rackloc'].rackloc_qtycpcaty;
                var rackloc_remark = response['rackloc'].rackloc_remark;
                var rackloc_supress = response['rackloc'].rackloc_supress;
                var rackloc_stock = response['rackloc'].rackloc_stock;
                var rackloc_distroy = response['rackloc'].rackloc_distroy;
                var racklocid = response['rackloc']._id;
                $('.rackloc_name').val(rackloc_name);
                $('.rackloc_rckno').val(rackloc_rckno);
                $('.rackloc_rowno').val(rackloc_rowno);
                $('.rackloc_qtycpcaty').val(rackloc_qtycpcaty);
                $('.rackloc_remark').val(rackloc_remark);
                if(rackloc_supress=='Y')
                {
                    $('.rackloc_supress').prop('checked', true);
                }
                else{
                    $('.rackloc_supress').prop('checked', false);
                }
                if(rackloc_stock=='Y')
                {
                    $('.rackloc_stock').prop('checked', true);
                }
                else{
                    $('.rackloc_stock').prop('checked', false);
                }
                if(rackloc_distroy=='Y')
                {
                    $('.rackloc_distroy').prop('checked', true);
                }
                else{
                    $('.rackloc_distroy').prop('checked', false);
                }
                $('#edit_rackloc').show();
                $('#edit').show();
                $('#rackloc_add').hide();
                $('#add').hide();
                $("#edit_rackloc").attr("action", "/rackloc_mast/edit_rackloc_mast/" + racklocid);
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
$(document).on('click', '.delete_rackloc', function(){
    $('.loader').show();
    let id = $(this).attr('data-id');
    $.ajax({
        type:'DELETE',
        url: '/rackloc_mast/'+id,
        success: function(response) {
            alert('confirm(Are you sure want to delete.)');
            window.location.href='/rackloc_mast/rackloc_mast';
            $('.loader').hide();
        },
        error: function(err) {
            console.log(err);
        }
    });
}); 
$(document).on('click', '.edit_pantone', function(){
    var pantoneid = $(this).attr('data-id');
    // alert(prodtid);
    $('.loader').show();
    $.ajax({
        type:'GET',
        url: '/pantone_mast/'+pantoneid,
        dataType:'json',
        success: function(response) {
            if(response['success'] == true) {
                console.log(response);
                var pantone_descrpton = response['pantone'].pantone_descrpton;
                var pantone_color = response['pantone'].pantone_color;
                var pantone_colorr = response['pantone'].pantone_colorr;
                var pantone_colorg = response['pantone'].pantone_colorg;
                var pantone_colorb = response['pantone'].pantone_colorb;
                var pantone_htmlcode = response['pantone'].pantone_htmlcode;
                var pantoneid = response['pantone']._id;
                $('.pantone_descrpton').val(pantone_descrpton);
                $('.pantone_color').val(pantone_color);
                $('.pantone_colorr').val(pantone_colorr);
                $('.pantone_colorg').val(pantone_colorg);
                $('.pantone_colorb').val(pantone_colorb);
                $('.pantone_htmlcode').val(pantone_htmlcode);
                $('#edit_pantone').show();
                $('#edit').show();
                $('#pantone_add').hide();
                $('#add').hide();
                $("#edit_pantone").attr("action", "/pantone_mast/edit_pantone_mast/" + pantoneid);
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
$(document).on('click', '.delete_pantone', function(){
    $('.loader').show();
    let id = $(this).attr('data-id');
    $.ajax({
        type:'DELETE',
        url: '/pantone_mast/'+id,
        success: function(response) {
            alert('confirm(Are you sure want to delete.)');
            window.location.href='/pantone_mast/pantone_mast';
            $('.loader').hide();
        },
        error: function(err) {
            console.log(err);
        }
    });
}); 
$(document).on('click', '.edit_employee', function(){
    var employeeid = $(this).attr('data-id');
    // alert(prodtid);
    $('.loader').show();
    $.ajax({
        type:'GET',
        url: '/employee_mast/'+employeeid,
        dataType:'json',
        success: function(response) {
            if(response['success'] == true) {
                console.log(response);
                var employee_name = response['employee'].employee_name;
                var employee_deprt = response['employee'].employee_deprt;
                var employee_desigaton = response['employee'].employee_desigaton;
                var employee_active = response['employee'].employee_active;
                var employee_sop = response['employee'].employee_sop;
                var filepath = response['employee'].filepath;
                var employeeid = response['employee']._id;
                $('.employee_name').val(employee_name);
                $('.employee_deprt').val(employee_deprt);
                $('.employee_desigaton').val(employee_desigaton);
                if(employee_active=='Y')
                {
                    $('.employee_active').prop('checked', true);
                }
                else{
                    $('.employee_active').prop('checked', false);
                }
                $('.employee_sop').val(employee_sop);
                $('.edit_filename').val(filepath);
                $('.edit_employee_img').attr("src",filepath);
                $('#edit_employee').show();
                $('#edit').show();
                $('#employee_add').hide();
                $('#add').hide();
                $("#edit_employee").attr("action", "/employee_mast/edit_employee_mast/" + employeeid);
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
$(document).on('click', '.delete_employee', function(){
    $('.loader').show();
    let id = $(this).attr('data-id');
    $.ajax({
        type:'DELETE',
        url: '/employee_mast/'+id,
        success: function(response) {
            alert('confirm(Are you sure want to delete.)');
            window.location.href='/employee_mast/employee_mast';
            $('.loader').hide();
        },
        error: function(err) {
            console.log(err);
        }
    });
}); 
$(document).on('click', '.edit_vehicle', function(){
    var vehicleid = $(this).attr('data-id');
    // alert(prodtid);
    $('.loader').show();
    $.ajax({
        type:'GET',
        url: '/vehicle_mast/'+vehicleid,
        dataType:'json',
        success: function(response) {
            if(response['success'] == true) {
                console.log(response);
                var vehicle_no = response['vehicle'].vehicle_no;
                var vehicle_cmpnymakr = response['vehicle'].vehicle_cmpnymakr;
                var vehicle_mdlno = response['vehicle'].vehicle_mdlno;
                var vehicle_orarrchd = response['vehicle'].vehicle_orarrchd;
                var vehicle_nofaxels = response['vehicle'].vehicle_nofaxels;
                var vehicle_rtopssing = response['vehicle'].vehicle_rtopssing;
                var vehicle_chisno = response['vehicle'].vehicle_chisno;
                var vehicle_engno = response['vehicle'].vehicle_engno;
                var vehicle_active = response['vehicle'].vehicle_active;
                var vehicle_expwin = response['vehicle'].vehicle_expwin;
                var vehicle_lockdt = response['vehicle'].vehicle_lockdt;
                var vehicle_mfgdt = response['vehicle'].vehicle_mfgdt;
                var vehicle_othrinfo = response['vehicle'].vehicle_othrinfo;
                var vehicle_onwrnm = response['vehicle'].vehicle_onwrnm;
                var vehicle_pylod = response['vehicle'].vehicle_pylod;
                var vehicleid = response['vehicle']._id;
                $('.vehicle_no').val(vehicle_no);
                $('.vehicle_cmpnymakr').val(vehicle_cmpnymakr);
                $('.vehicle_mdlno').val(vehicle_mdlno);
                $('.vehicle_orarrchd').val(vehicle_orarrchd);
                $('.vehicle_nofaxels').val(vehicle_nofaxels);
                $('.vehicle_rtopssing').val(vehicle_rtopssing);
                $('.vehicle_chisno').val(vehicle_chisno);
                $('.vehicle_engno').val(vehicle_engno);
                $('.vehicle_active').val(vehicle_active);
                $('.vehicle_expwin').val(vehicle_expwin);
                $('.vehicle_lockdt').val(vehicle_lockdt);
                $('.vehicle_mfgdt').val(vehicle_mfgdt);
                $('.vehicle_othrinfo').val(vehicle_othrinfo);
                $('.vehicle_onwrnm').val(vehicle_onwrnm);
                $('.vehicle_pylod').val(vehicle_pylod);
                $('#edit_vehicle').show();
                $('#edit').show();
                $('#vehicle_add').hide();
                $('#add').hide();
                $("#edit_vehicle").attr("action", "/vehicle_mast/edit_vehicle_mast/" + vehicleid);
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
$(document).on('click', '.delete_vehicle', function(){
    $('.loader').show();
    let id = $(this).attr('data-id');
    $.ajax({
        type:'DELETE',
        url: '/vehicle_mast/'+id,
        success: function(response) {
            alert('confirm(Are you sure want to delete.)');
            window.location.href='/vehicle_mast/vehicle_mast';
            $('.loader').hide();
        },
        error: function(err) {
            console.log(err);
        }
    });
}); 
$(document).on('click', '.edit_maintance', function(){
    var maintanceid = $(this).attr('data-id');
    // alert(prodtid);
    $('.loader').show();
    $.ajax({
        type:'GET',
        url: '/maintance_mast/'+maintanceid,
        dataType:'json',
        success: function(response) {
            if(response['success'] == true) {
                console.log(response);
                var maintance_name = response['maintance'].maintance_name;
                var maintance_address = response['maintance'].maintance_address;
                var maintance_typ = response['maintance'].maintance_typ;
                var maintanceid = response['maintance']._id;
                $('.maintance_name').val(maintance_name);
                $('.maintance_address').val(maintance_address);
                $('.maintance_typ').val(maintance_typ);
                $('#edit_maintance').show();
                $('#edit').show();
                $('#maintance_add').hide();
                $('#add').hide();
                $("#edit_maintance").attr("action", "/maintance_mast/edit_maintance_mast/" + maintanceid);
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
$(document).on('click', '.delete_maintance', function(){
    $('.loader').show();
    let id = $(this).attr('data-id');
    $.ajax({
        type:'DELETE',
        url: '/maintance_mast/'+id,
        success: function(response) {
            alert('confirm(Are you sure want to delete.)');
            window.location.href='/maintance_mast/maintance_mast';
            $('.loader').hide();
        },
        error: function(err) {
            console.log(err);
        }
    });
}); 

$(document).on('click', '.edit_machinechk', function(){
    var machinechkid = $(this).attr('data-id');
    // alert(prodtid);
    $('.loader').show();
    $.ajax({
        type:'GET',
        url: '/machinechecklist_mast/'+machinechkid,
        dataType:'json',
        success: function(response) {
            if(response['success'] == true) {
                console.log(response);
                var machinechk_dscrpton = response['machinechecklist'].machinechk_dscrpton;
                var machinechk_code = response['machinechecklist'].machinechk_code;
                var machinechk_instrcton = response['machinechecklist'].machinechk_instrcton;
                var machinechkid = response['machinechecklist']._id;
                $('.machinechk_dscrpton').val(machinechk_dscrpton);
                $('.machinechk_code').val(machinechk_code);
                $('.machinechk_instrcton').val(machinechk_instrcton);
                $('#edit_machinechk').show();
                $('#edit').show();
                $('#machinechk_add').hide();
                $('#add').hide();
                $("#edit_machinechk").attr("action", "/machinechecklist_mast/edit_machinechk_mast/" + machinechkid);
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
$(document).on('click', '.delete_machinechk', function(){
    $('.loader').show();
    let id = $(this).attr('data-id');
    $.ajax({
        type:'DELETE',
        url: '/machinechecklist_mast/'+id,
        success: function(response) {
            alert('confirm(Are you sure want to delete.)');
            window.location.href='/machinechecklist_mast/machinechecklist_mast';
            $('.loader').hide();
        },
        error: function(err) {
            console.log(err);
        }
    });
}); 
$(document).on('click', '.edit_qcequimnts', function(){
    var qcequimntsid = $(this).attr('data-id');
    // alert(prodtid);
    $('.loader').show();
    $.ajax({
        type:'GET',
        url: '/qcequimnts_mast/'+qcequimntsid,
        dataType:'json',
        success: function(response) {
            if(response['success'] == true) {
                console.log(response);
                var qcequimnts_eqname = response['qcequimnts'].qcequimnts_eqname;
                var qcequimnts_calbrton = response['qcequimnts'].qcequimnts_calbrton;
                var qcequimnts_calbrtontwo = response['qcequimnts'].qcequimnts_calbrtontwo;
                var qcequimnts_days = response['qcequimnts'].qcequimnts_days;
                var qcequimnts_year = response['qcequimnts'].qcequimnts_year;
                var qcequimnts_deprt = response['qcequimnts'].qcequimnts_deprt;
                var qcequimnts_wghtbxcabrton = response['qcequimnts'].qcequimnts_wghtbxcabrton;
                var qcequimnts_chklst = response['qcequimnts'].qcequimnts_chklst;
                var qcequimnts_instrcton = response['qcequimnts'].qcequimnts_instrcton;
                var qcequimntsid = response['qcequimnts']._id;
                $('.qcequimnts_eqname').val(qcequimnts_eqname);
                $('.qcequimnts_calbrton').val(qcequimnts_calbrton);
                $('.qcequimnts_calbrtontwo').val(qcequimnts_calbrtontwo);
                $('.qcequimnts_days').val(qcequimnts_days);
                $('.qcequimnts_year').val(qcequimnts_year);
                $('.qcequimnts_deprt').val(qcequimnts_deprt);
                if(qcequimnts_wghtbxcabrton=='Y')
                {
                    $('.qcequimnts_wghtbxcabrton').prop('checked', true);
                }
                else{
                    $('.qcequimnts_wghtbxcabrton').prop('checked', false);
                }
                $('.qcequimnts_chklst').val(qcequimnts_chklst);
                $('.qcequimnts_instrcton').val(qcequimnts_instrcton);
                $('#edit_qcequimnts').show();
                $('#edit').show();
                $('#qcequimnts_add').hide();
                $('#add').hide();
                $("#edit_qcequimnts").attr("action", "/qcequimnts_mast/edit_qcequimnts_mast/" + qcequimntsid);
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
$(document).on('click', '.delete_qcequimnts', function(){
    $('.loader').show();
    let id = $(this).attr('data-id');
    $.ajax({
        type:'DELETE',
        url: '/qcequimnts_mast/'+id,
        success: function(response) {
            alert('confirm(Are you sure want to delete.)');
            window.location.href='/qcequimnts_mast/qcequimnts_mast';
            $('.loader').hide();
        },
        error: function(err) {
            console.log(err);
        }
    });
}); 

$(document).on('click', '.edit_jobactivty', function(){
    var jobactivtyid = $(this).attr('data-id');
    // alert(prodtid);
    $('.loader').show();
    $.ajax({
        type:'GET',
        url: '/jobactivty_mast/'+jobactivtyid,
        dataType:'json',
        success: function(response) {
            if(response['success'] == true) {
                console.log(response);
                var jobactivty_deprt = response['jobactivty'].jobactivty_deprt;
                var jobactivty_actvnm = response['jobactivty'].jobactivty_actvnm;
                var jobactivty_group = response['jobactivty'].jobactivty_group;
                for (let r = 0; r < jobactivty_group.length; r++){
                        var job = jobactivty_group[r];
                        html = '<tr class="jobview_wrapper" id="jobview_group_var-'+r+'"><input type="hidden" name="cntrtol'+r+'" value="'+r+'" id=cntrtol"'+r+'"><td><input type="text" class="form-control" name="jobactivty_group['+r+'][dscpton]" value="'+job.dscpton+'" id="dscpton"  style="width:100%;"></td><td><select class="form-control jobactivty_typ" name="jobactivty_group['+r+'][typ]" id="typ"><option value="'+job.typ+'">'+job.typ+'</option></option><option value="Date">Date</option><option value="Shift">Shift</option><option value="Time">Time</option><option value="Loging">Loging</option><option value="Text">Text</option><option value="Combo">Combo</option><option value="Observation">Observation</option><option value="Y/n">Y/n</option></td><td><input type="text" class="form-control" name="jobactivty_group['+r+'][timrq]" value="'+job.timrq+'" id="timrq" style="width:100%;"></td><td><input type="text" class="form-control" name="jobactivty_group['+r+'][dfltval]" value="'+job.dfltval+'" id="dfltval" style="width:100%;"></td><td><input type="text" class="form-control" name="jobactivty_group['+r+'][ordr]" value="'+job.ordr+'" id="ordr" style="width:100%;"></td>';
                        
                            html +='<td>';
                            if(r != 0)
                            {
                                html += '<a data-repeater-delete="'+r+'" class="jobupdate-delete-btn"" style="cursor:pointer;"><i class="fa fa-times" style="font-size: 20px;color: red;"></i></a> ';
                            }   
                            html += '</td> </tr>';
                            $('.job_result').append(html);      
                    } 
                
                var jobactivty_active = response['jobactivty'].jobactivty_active;
                var jobactivtyid = response['jobactivty']._id;
                $('.jobactivty_deprt').val(jobactivty_deprt);
                $('.jobactivty_actvnm').val(jobactivty_actvnm);
                if(jobactivty_active=='Y')
                {
                    $('.jobactivty_active').prop('checked', true);
                }
                else{
                    $('.jobactivty_active').prop('checked', false);
                }
                $('#edit_jobactivty').show();
                $('#edit').show();
                $('#jobactivty_add').hide();
                $('#add').hide();
                $("#edit_jobactivty").attr("action", "/jobactivty_mast/edit_jobactivty_mast/" + jobactivtyid);
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
$(document).on("click", ".jobupdate-delete-btn", function(){
    alert('Are you sure you want to delete this element');
    var brandIndex = $(this).attr('data-repeater-delete');
    var parent_id = $(this).closest('.jobview_wrapper').prop('id');
    $("#"+parent_id).remove();
    $('#inner-btn-'+brandIndex).remove();
}); 
var jobup = 1;
var jobupmember = jobup + 1;
var jobuplimit = 10;
$(document).on('click', '.addjobactiveupdate', function()
{
    lstdx = $("input[name*='cntrtol']").length;
    jobup=lstdx;

  if (jobup == jobuplimit)
  {
    alert("You have reached the limit of adding " + jobup + " inputs");
  }
  else
  {
        var new_div = document.createElement('div');
        var new_div = "<tr class='updatejob_wrapper' id='rohit"+ jobup +"'><td><input type='text' class='form-control' name='jobactivty_group["+jobup+"][dscpton]' id='dscpton'  style='width:100%;'></td><td><select class='form-control jobactivty_typ' name='jobactivty_group["+jobup+"][typ]' id='typ'><option value=''>----Select Type----</option><option value='Date'>Date</option><option value='Shift'>Shift</option><option value='Time'>Time</option><option value='Loging'>Loging</option><option value='Text'>Text</option><option value='Combo'>Combo</option><option value='Observation'>Observation</option><option value='Y/n'>Y/n</option></select></td><td><input type='text' class='form-control' name='jobactivty_group["+jobup+"][timrq]' id='timrq' style='width:100%;'></td><td> <input type='text' class='form-control' name='jobactivty_group["+jobup+"][dfltval]' id='dfltval' style='width:100%;'></td><td> <input type='text' class='form-control' name='jobactivty_group["+jobup+"][ordr]' id='ordr' style='width:100%;'></td><td><a data-repeater-delete='inner-field-"+ jobup +"' data-brand-index='"+ jobup +"' class='updatejbactive-delete-btn' style='cursor:pointer;'><i class='fa fa-times' style='font-size: 20px;color: red;'></i></a></td><td><input type='hidden' name='cntrtol"+lstdx+"' value="+lstdx+" id='cntrtol"+lstdx+"'></td></tr>";
        $(new_div).insertBefore("#insert_jobupdate");
        jobup++;
        jobmember++;

  } 
});
$(document).on("click", ".updatejbactive-delete-btn", function(){
    alert('Are you sure you want to delete this element');
    var parent_id = $(this).closest('.updatejob_wrapper').prop('id');
    $("#"+parent_id).remove();
});            
$(document).on('click', '.delete_jobactivty', function(){
    $('.loader').show();
    let id = $(this).attr('data-id');
    $.ajax({
        type:'DELETE',
        url: '/jobactivty_mast/'+id,
        success: function(response) {
            alert('confirm(Are you sure want to delete.)');
            window.location.href='/jobactivty_mast/jobactivty_mast';
            $('.loader').hide();
        },
        error: function(err) {
            console.log(err);
        }
    });
}); 
$(document).on('click', '.edit_security_btn', function(){
    var securityid = $(this).attr('data-id');
    // alert(securityid);
    $('.loader').show();
    $.ajax({
        type:'GET',
        url: '/security_right/'+securityid,
        dataType:'json',
        success: function(response) {
            if(response['success'] == true) {
                //console.log(response);
                var right_name = response['security'].right_name;
                var right_desc = response['security'].right_desc;
                var securityid = response['security']._id;
                $('.right_name').val(right_name);
                $('.right_desc').val(right_desc);
                $('#edit_security').show();
                $('#security_add').hide();
                $("#edit_security").attr("action", "/security_right/edit_security/" + securityid);
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
$(document).on('click', '.delete-security', function(){
    $('.loader').show();
    let id = $(this).attr('data-id');
    $.ajax({
        type:'DELETE',
        url: '/security_right/'+id,
        success: function(response) {
            alert('confirm(Are you sure want to delete.)');
            // $('.loader').hide();
            window.location.href='/security_right/security_right';
            $('.loader').hide();
        },
        error: function(err) {
            console.log(err);
        }
    });
});

var job = 1;
var jobmember = job + 1;
var joblimit = 10;
$(document).on('click', '.addjobactive', function()
{
  if (job == joblimit)
  {
    alert("You have reached the limit of adding " + job + " inputs");
  }
  else
  {
        var new_div = document.createElement('div');
        var new_div = "<tr class='job_wrapper' id='rohit"+job+"'><td><input type='text' class='form-control' name='jobactivty_group["+ job +"][dscpton]' id='dscpton'  style='width:100%;'></td><td><select class='form-control jobactivty_typ' name='jobactivty_group["+ job +"][typ]' id='typ'><option value=''>----Select Type----</option><option value='Date'>Date</option><option value='Shift'>Shift</option><option value='Time'>Time</option><option value='Loging'>Loging</option><option value='Text'>Text</option><option value='Combo'>Combo</option><option value='Observation'>Observation</option><option value='Y/n'>Y/n</option></select></td><td><input type='text' class='form-control' name='jobactivty_group["+ job +"][timrq]' id='timrq' style='width:100%;'></td><td> <input type='text' class='form-control' name='jobactivty_group["+ job +"][dfltval]' id='dfltval' style='width:100%;'></td><td> <input type='text' class='form-control' name='jobactivty_group["+ job +"][ordr]' id='ordr' style='width:100%;'></td><td><a data-repeater-delete='inner-field-"+job+"' data-brand-index='"+job+"' class='jbactive-delete-btn' style='cursor:pointer;'><i class='fa fa-times' style='font-size: 20px;color: red;'></i></a></td></tr>";
        $(new_div).insertBefore("#insert_job");
        job++;
        jobmember++;

  } 
});
$(document).on("click", ".jbactive-delete-btn", function(){
    alert('Are you sure you want to delete this element');
    var parent_id = $(this).closest('.job_wrapper').prop('id');
    $("#"+parent_id).remove();
});


var stock = 1;
var stockmember = job + 1;
var stocklimit = 10;
$(document).on('click', '.addstockitem', function()
{
  if (stock == stocklimit)
  {
    alert("You have reached the limit of adding " + stock + " inputs");
  }
  {
    var pantone = "";
    $.ajax({
        type:'GET',
        url: '/stockpantone_mast/pantonename',
        dataType:'json',
        success: function(data) {
            if( data['success'] ) {
                pantone = data['accink'];
                console.log(pantone);
                var new_div = document.createElement('div');
                var new_div = "<tr class='stock_wrapper' id='rohit"+ stock +"'><td><select class='form-control' name='stock_item["+stock+"][baseink]' id='baseink' style='width:100%;'><option value=''>----Select Base Ink----</option>";
                for(j = 0; j < pantone.length; j++) {
                    new_div += "<option value='"+pantone[j]['_id']+"'>"+pantone[j]['accessories_desc']+"</option>";
                   }
                new_div +="</select></td><td><input type='text' class='form-control' name='stock_item["+stock+"][qty]'  id='qty' style='width:100%;' placeholder='Qty.  [GMS]'></td><td><input type='text' class='form-control' name='stock_item["+stock+"][btcno]' id='btcno' style='width:100%;' placeholder='Batch No'></td><td><input type='text' class='form-control' name='stock_item["+stock+"][inkmafuctor]' id='inkmafuctor' style='width:100%;' placeholder='Ink Manufacturer'></td><td><input type='text' class='form-control' name='stock_item["+stock+"][mfgdt]' id='mfgdt' style='width:100%;' placeholder='Mfg date'></td><td><select class='form-control jobactivty_deprt' name='stock_item["+stock+"][drwdown]' id='drwdown' style='width:100%;'><option value=''>----Select Draw Down----</option><option value='small'>small</option><option value='Big'>Big</option><option value='Two small'>Two small</option></select></td><td><input type='text' class='form-control' name='stock_item["+stock+"][labvalue]' id='labvalue' style='width:100%;' placeholder='Lab Value'></td><td><input type='text' class='form-control' name='stock_item["+stock+"][remarks]' id='remarks' style='width:100%;' placeholder='Remarks'></td><td><a data-repeater-delete='inner-field-"+ stock +"' data-brand-index='"+job+"' class='stockitem-delete-btn' style='cursor:pointer;'><i class='fa fa-times' style='font-size: 20px;color: red;'></i></a></td></tr>";
                $(new_div).insertBefore("#insert_stockitem");
                stock++;
                stockmember++;
            }
        }
    });

  } 
});
$(document).on("click", ".stockitem-delete-btn", function(){
    alert('Are you sure you want to delete this element');
    var parent_id = $(this).closest('.stock_wrapper').prop('id');
    $("#"+parent_id).remove();
});
$(document).on('click', '.edit_stockpantone', function(){
    var stockpantoneid = $(this).attr('data-id');
    // alert(prodtid);
    $('.loader').show();
    $.ajax({
        type:'GET',
        url: '/stockpantone_mast/'+stockpantoneid,
        dataType:'json',
        success: function(response) {
            if(response['success'] == true) {
                acccc = response['accink'];
                console.log(response);
                var stockpantone_rcpno = response['stockpantone'].stockpantone_rcpno;
                var stockpantone_board = response['stockpantone'].stockpantone_board;
                var stockpantone_pantonno = response['stockpantone'].stockpantone_pantonno;
                var stockpantone_barcode = response['stockpantone'].stockpantone_barcode;
                var stock_item = response['stockpantone'].stock_item;
                for (let r = 0; r < stock_item.length; r++){
                        var stock = stock_item[r];
                        html = '<tr class="stockview_wrapper" id="jobview_group_var-'+r+'"><input type="hidden" name="cntrtol'+r+'" value="'+r+'" id=cntrtol"'+r+'"> <td><select class="form-control stockpantone_deprt" name="stock_item['+r+'][baseink]" id="baseink" style="width:100%;"><option value="">----Select Base Ink----</option>';
                        for(j = 0; j < acccc.length; j++) {
                            if(stock_item[r]['baseink']=acccc[j]['_id'])
                            {
                                html += "<option value='"+acccc[j]['_id']+"' selected>"+acccc[j]['accessories_desc']+"</option>";
                            }
                            else{
                                html += "<option value='"+acccc[j]['_id']+"'>"+acccc[j]['accessories_desc']+"</option>";
                            }
                            
                           }
                        html +='</select></td><td><input type="text" class="form-control" name="stock_item['+r+'][qty]" value="'+stock.qty+'"  id="qty" style="width:100%;" placeholder="Qty.  [GMS]"></td><td><input type="text" class="form-control" name="stock_item['+r+'][btcno]" value="'+stock.btcno+'" id="btcno" style="width:100%;" placeholder="Batch No"></td><td><input type="text" class="form-control" name="stock_item['+r+'][inkmafuctor]" value="'+stock.inkmafuctor+'" id="inkmafuctor" style="width:100%;" placeholder="Ink Manufacturer"></td><td><input type="text" class="form-control" name="stock_item['+r+'][mfgdt]" value="'+stock.mfgdt+'" id="mfgdt" style="width:100%;" placeholder="Mfg date"></td><td><select class="form-control stockpantone_deprt" name="stock_item['+r+'][drwdown]" id="drwdown" style="width:100%;"><option value="'+stock.drwdown+'">'+stock.drwdown+'</option><option value="small">small</option><option value="Big">Big</option><option value="Two small">Two small</option></select></td><td><input type="text" class="form-control" name="stock_item['+r+'][labvalue]" value="'+stock.labvalue+'" id="labvalue" style="width:100%;" placeholder="Lab Value"></td><td><input type="text" class="form-control" name="stock_item['+r+'][remarks]" value="'+stock.remarks+'" id="remarks" style="width:100%;" placeholder="Remarks"></td>';
                        
                            html +='<td>';
                            if(r != 0)
                            {
                                html += '<a data-repeater-delete="'+r+'" class="stockupdate-delete-btn"" style="cursor:pointer;"><i class="fa fa-times" style="font-size: 20px;color: red;"></i></a> ';
                            }   
                            html += '</td> </tr>';
                            $('.stock_result').append(html);      
                    } 
                var stockpantoneid = response['stockpantone']._id;
                $('.stockpantone_rcpno').val(stockpantone_rcpno);
                $('.stockpantone_board').val(stockpantone_board);
                $('.stockpantone_pantonno').val(stockpantone_pantonno);
                $('.stockpantone_barcode').val(stockpantone_barcode);
                $('#edit_stockpantone').show();
                $('#edit').show();
                $('#stockpantone_add').hide();
                $('#add').hide();
                $("#edit_stockpantone").attr("action", "/stockpantone_mast/edit_stockpantone_mast/" + stockpantoneid);
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
$(document).on("click", ".stockupdate-delete-btn", function(){
    alert('Are you sure you want to delete this element');
    var brandIndex = $(this).attr('data-repeater-delete');
    var parent_id = $(this).closest('.stockview_wrapper').prop('id');
    $("#"+parent_id).remove();
    $('#inner-btn-'+brandIndex).remove();
});  

var updatestock = 1;
var updatestockmember = job + 1;
var updatestocklimit = 10;
$(document).on('click', '.updateaddstockitem', function()
{
    lstdx = $("input[name*='cntrtol']").length;
    updatestock=lstdx;

  if (updatestock == updatestocklimit)
  {
    alert("You have reached the limit of adding " + updatestock + " inputs");
  }
  {
    var pantone = "";
    $.ajax({
        type:'GET',
        url: '/stockpantone_mast/pantonename',
        dataType:'json',
        success: function(data) {
            if( data['success'] ) {
                pantone = data['accink'];
                console.log(pantone);
                var new_div = document.createElement('div');
                var new_div = "<tr class='updatestock_wrapper' id='rohit"+updatestock+"'><input type='hidden' name='cntrtol"+lstdx+"' value="+lstdx+" id='cntrtol"+lstdx+"'><td><select class='form-control' name='stock_item["+updatestock+"][baseink]' id='baseink' style='width:100%;'><option value=''>----Select Base Ink----</option>";
                for(j = 0; j < pantone.length; j++) {
                    new_div += "<option value='"+pantone[j]['_id']+"'>"+pantone[j]['accessories_desc']+"</option>";
                   }
                new_div +="</select></td><td><input type='text' class='form-control' name='stock_item["+updatestock+"][qty]'  id='qty' style='width:100%;' placeholder='Qty.  [GMS]'></td><td><input type='text' class='form-control' name='stock_item["+updatestock+"][btcno]' id='btcno' style='width:100%;' placeholder='Batch No'></td><td><input type='text' class='form-control' name='stock_item["+updatestock+"][inkmafuctor]' id='inkmafuctor' style='width:100%;' placeholder='Ink Manufacturer'></td><td><input type='text' class='form-control' name='stock_item["+updatestock+"][mfgdt]' id='mfgdt' style='width:100%;' placeholder='Mfg date'></td><td><select class='form-control jobactivty_deprt' name='stock_item["+updatestock+"][drwdown]' id='drwdown' style='width:100%;'><option value=''>----Select Draw Down----</option><option value='small'>small</option><option value='Big'>Big</option><option value='Two small'>Two small</option></select></td><td><input type='text' class='form-control' name='stock_item["+updatestock+"][labvalue]' id='labvalue' style='width:100%;' placeholder='Lab Value'></td><td><input type='text' class='form-control' name='stock_item["+updatestock+"][remarks]' id='remarks' style='width:100%;' placeholder='Remarks'></td><td><a data-repeater-delete='inner-field-"+updatestock+" data-brand-index='"+updatestock+"' class='updatestockitem-delete-btn' style='cursor:pointer;'><i class='fa fa-times' style='font-size: 20px;color: red;'></i></a></td></tr>";
                $(new_div).insertBefore("#insert_stockupdate");
                updatestock++;
                updatestocklimit++;
            }
        }
    });

  } 
});
$(document).on("click", ".updatestockitem-delete-btn", function(){
    alert('Are you sure you want to delete this element');
    var brandIndex = $(this).attr('data-repeater-delete');
    var parent_id = $(this).closest('.updatestock_wrapper').prop('id');
    $("#"+parent_id).remove();
    $('#inner-btn-'+brandIndex).remove();
}); 
$(document).on('click', 'delete_stockpantone', function(){
    $('.loader').show();
    let id = $(this).attr('data-id');
    $.ajax({
        type:'DELETE',
        url: '/stockpantone_mast/'+id,
        success: function(response) {
            alert('confirm(Are you sure want to delete.)');
            // $('.loader').hide();
            window.location.href='/stockpantone_mast/stockpantone_mast';
            $('.loader').hide();
        },
        error: function(err) {
            console.log(err);
        }
    });
});