

       	 $(document).ready(function()
       	 	{
       	 		jQuery.validator.addMethod("lettersonly", function(value, element) {
                 return this.optional(element) || /^[a-z\s]+$/i.test(value);
               }, "Only alphabetical characters");

       	 		$("#frm").validate(
       	 			{
       	 				rules:
       	 				{
       	 					employee_name:
       	 					{
       	 						required:true,
       	 						lettersonly:true
       	 					},
       	 					employee_password:
       	 					{
       	 						required:true,
       	 						minlength:6,
       	 						maxlength:10

       	 					},
       	 					employee_email:
       	 					{
       	 						required:true,
       	 						email:true
       	 					},
       	 					employee_number:
       	 					{
       	 						required:true,
       	 						digits: true,
                                minlength:9,
                                maxlength:10
                                
       	 					},
       	 					country:
       	 					{
       	 						required:true
       	 					},
       	 					state:
       	 					{
       	 						required:true
       	 					},
       	 					city:
       	 					{
       	 						required:true
       	 					},
       	 					address:
       	 					{
       	 						required:true
       	 					},
       	 					gender:
       	 					{
       	 						required:true
       	 					},
       	 					'hobbies[]':
       	 					{
       	 						required:true
       	 					}
       	 				},
       	 				messages:
       	 				   {
       	 					employee_name:
       	 					{
       	 						required:"please enter the employee_name:"
       	 					},
       	 					employee_password:
       	 					{
       	 						required:"please enter the password",
       	 						minlength:"please enter the minimum 6 charactor",
       	 						maxlength:"please enter the maximum 10 character"
       	 					},

       	 					employee_email:
       	 					{
       	 						required:"please enter the email_id"
       	 					},
       	 					employee_number:
       	 					{
       	 						required:"Enter your mobile no"
       	 					},
       	 					country:
       	 					{
       	 						required:"please select the country"
       	 					},
       	 					state:
       	 					{
       	 						required:"please select the state"
       	 					},
       	 					city:
       	 					{
       	 						required:"please select the city"
       	 					}
       	 				}
       	 			});
       	 	});
       