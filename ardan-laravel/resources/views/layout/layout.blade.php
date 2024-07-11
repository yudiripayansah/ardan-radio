<!DOCTYPE html>
<html lang="en">
<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, shrink-to-fit=no">
		<title>Ardan Radio</title>
		<link rel="icon" type="image/x-icon" href="/resources/assets/img/ardan/logo.png"/>
		<link href="/resources/vertical-light-menu/css/light/loader.css" rel="stylesheet" type="text/css" />
		<link href="/resources/vertical-light-menu/css/dark/loader.css" rel="stylesheet" type="text/css" />
		<script src="/resources/vertical-light-menu/loader.js"></script>

		<!-- BEGIN GLOBAL MANDATORY STYLES -->
		<link href="https://fonts.googleapis.com/css?family=Nunito:400,600,700" rel="stylesheet">
		<link href="/resources/bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
		<link href="/resources/vertical-light-menu/css/light/plugins.css" rel="stylesheet" type="text/css" />
		<link href="/resources/vertical-light-menu/css/dark/plugins.css" rel="stylesheet" type="text/css" />
		<!-- END GLOBAL MANDATORY STYLES -->

		<!-- BEGIN PAGE LEVEL PLUGINS/CUSTOM STYLES -->
		<link href="/resources/plugins/src/apex/apexcharts.css" rel="stylesheet" type="text/css">
		<link href="/resources/assets/css/light/dashboard/dash_1.css" rel="stylesheet" type="text/css" />
		<link href="/resources/assets/css/dark/dashboard/dash_1.css" rel="stylesheet" type="text/css" />
    <link href="/resources/assets/css/light/elements/alert.css" rel="stylesheet" type="text/css">
    <link href="/resources/assets/css/dark/elements/alert.css" rel="stylesheet" type="text/css">
    <link href="/resources/plugins/src/table/datatable/datatables.css" rel="stylesheet" type="text/css">
    <link href="/resources/plugins/css/light/table/datatable/dt-global_style.css" rel="stylesheet" type="text/css">
    <link href="/resources/plugins/css/light/table/datatable/custom_dt_miscellaneous.css" rel="stylesheet" type="text/css">
    <link href="/resources/assets/css/light/scrollspyNav.css" rel="stylesheet" type="text/css" />
    <link href="/resources/assets/css/light/components/carousel.css" rel="stylesheet" type="text/css">
    <link href="/resources/assets/css/light/components/modal.css" rel="stylesheet" type="text/css" />
    <link href="/resources/assets/css/light/components/tabs.css" rel="stylesheet" type="text/css">
    <link href="/resources/assets/css/custom.css" rel="stylesheet" type="text/css">
		@yield('customStyle')
		<!-- Mandatory Vue -->
		<script src="{{ url('/resources/plugins/vue2/vue.js') }}"></script>
		<script src="https://unpkg.com/vuex@4.0.0/dist/vuex.global.js"></script>
		<script src="{{ url('/resources/plugins/axios/axios.js') }}"></script>
		<script src="{{ url('/resources/assets/js/store.js') }}"></script>
		<script src="{{ url('/resources/assets/js/helper.js') }}"></script>
		<script src="{{ url('/resources/assets/js/Api.js') }}"></script>
		<script src="{{ url('node_modules/@ckeditor/ckeditor5-build-classic/build/ckeditor.js') }}"></script>
		<script src="{{ url('node_modules/@ckeditor/ckeditor5-image/build/image.js') }}"></script>
		<script src="{{ url('node_modules/@ckeditor/ckeditor5-vue2/dist/ckeditor.js') }}"></script>
</head>
<body class="layout-boxed">
		<!-- BEGIN LOADER -->
		<div id="load_screen"> 
			<div class="loader"> 
				<div class="loader-content">
					<div class="spinner-grow align-self-center"></div>
				</div>
			</div>
		</div>
		<!--  END LOADER -->
		@include('layout.navbar')

		<!--  BEGIN MAIN CONTAINER  -->
		<div class="main-container" id="container">

				<div class="overlay"></div>
				<div class="search-overlay"></div>

				@include('layout.sidebar')

				<!--  BEGIN CONTENT AREA  -->
				<div id="content" class="main-content">
						@yield('screen')
						<!--  BEGIN FOOTER  -->
						<div class="footer-wrapper">
								<div class="footer-section f-section-1">
										<p class="">Copyright © <span class="dynamic-year">2022</span> <a target="_blank" href="https://designreset.com/cork-admin/">DesignReset</a>, All rights reserved.</p>
								</div>
								<div class="footer-section f-section-2">
										<p class="">Coded with <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-heart"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg></p>
								</div>
						</div>
						<!--  END FOOTER  -->
				</div>
				<!--  END CONTENT AREA  -->

		</div>
		<!-- END MAIN CONTAINER -->

		<!-- BEGIN GLOBAL MANDATORY SCRIPTS -->
		<script src="/resources/bootstrap/js/bootstrap.bundle.min.js"></script>
		<script src="/resources/plugins/src/perfect-scrollbar/perfect-scrollbar.min.js"></script>
		<script src="/resources/plugins/src/mousetrap/mousetrap.min.js"></script>
		<script src="/resources/vertical-light-menu/app.js"></script>
		<!-- END GLOBAL MANDATORY SCRIPTS -->
		@yield('customScript')

</body>
</html>