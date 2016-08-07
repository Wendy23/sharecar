$.ajax({
    url: '/searchRoute/searchRoute',
    type: 'post',
    data: {data},
    success: function(data, status) {
        console.log("print",data);
        if (status == 'success') {
            alert("success");
            $('#ss').hide();
            $('#rideTable').show();
            
        }
    },
    error: function(data, status) {
        if (status == 'error') {
            $('#ss').show();
        }
    }