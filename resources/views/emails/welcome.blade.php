<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Neatman</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
            text-align: center;
        }

        header {
            background-color: #4CAF50;
            color: #fff;
            padding: 1em;
        }

        main {
            padding: 2em;
        }

        h1 {
            color: #333;
        }

        p {
            color: #666;
            line-height: 1.6;
        }

        .cta-button {
            display: inline-block;
            padding: 10px 20px;
            margin-top: 20px;
            font-size: 16px;
            font-weight: bold;
            text-align: center;
            text-decoration: none;
            background-color: #4CAF50;
            color: #fff;
            border-radius: 5px;
        }

        .cta-button:hover {
            background-color: #45a049;
        }
    </style>
</head>

<body>
    <header>
        <h1>Welcome to Neatman!</h1>
    </header>
    <main>
        <p>Dear {{$user->first_name}},</p>
        <p>Welcome to Neatman, where nature meets style!</p>
        <p>Discover our collection of natural rocks and plants – perfect for bringing the beauty of nature into your life.</p>
        <p>Explore exquisite rocks, vibrant plants, and curated collections tailored to your tastes.</p>
        <a href="https://www.neatmanindustrial.com/" class="cta-button">Start Exploring Now</a>
        <p>Thanks for choosing Neatman. Let's bring the beauty of nature into your world!</p>
        <p>Best regards,<br>The Neatman Team</p>
    </main>
</body>

</html>
