// /*tab1*/
function setTab(name, cursel, n) {
    for (i = 1; i <= n; i++) {
        var menu = document.getElementById(name + i);
        var con = document.getElementById("con_" + name + "_" + i);
        menu.className = i == cursel ? "hover" : "";
        con.style.display = i == cursel ? "block" : "none";
    }
}


// $(function () {
//     $('#one1').click(function () {
//         $(this).show();
//         $('#con_one_1').show();
//         $('#con_one_1').siblings().hide();
//     });
//
//     $('#one2').click(function () {
//         $(this).show();
//         $('#con_one_2').show();
//         $('#con_one_2').siblings().hide();
//
//     });
//
//     $('#one3').click(function () {
//         $(this).show();
//     });
//
// });

