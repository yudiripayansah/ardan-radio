<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Ardan Radio - {{$type}}</title>
  <link href="https://fonts.googleapis.com/css?family=Nunito:400,600,700" rel="stylesheet">
</head>
<style>
  * {
    font-family: 'Nunito';
  }
  body {
    margin: 0;
    padding: 0;
    background-color: #090902;
  }
  .ard-box {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .ard-box a {
    font-size: 18px;
    margin-top: 20px;
    background-color: #f8c303;
    padding: 10px 20px;
    border-radius: 5px;
    text-align: center;
    color: #090902;
    text-decoration: none;
  }
</style>
<body>
  <div class="ard-box">
    <img src="/resources/assets/img/ardan/logo.png" class="navbar-logo-new" alt="logo">
    <a href="ardanmobileapps://{{$type}}/{{$id}}">Click to open on Ardan Mobile Apps</a>
  </div>
</body>
</html>