<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="App_mainContent">
        <div class="App_card">
            <div class="App_cardTop">
                <img src="./assets/nike.png" alt="" class="App_cardTopLogo">
            </div>
            <div class="App_cardTitle">Our Products</div>
            <div class="App_cardBody">
                <?php 
            $json_data = file_get_contents('./data/shoes.json');
            $data = json_decode($json_data,true);
            foreach($data as $item){
                echo '
                <div>
                        <div class="App_shopItem">
                            <div class="App_shopItemId" id="'.$item['id'].'"></div>
                            <div class="App_shopItemImage" style="background-color:'.$item['color'].'" >
                                <img src="'.$item['image'].'" alt="" class="App_shopItemImage">
                            </div>
                            <div class="App_shopItemName">'.$item['name'].'</div>
                            <div class="App_shopItemDescription">'.$item['description'].'</div>
                            <div class="App_shopItemBottom">
                                <div class="App_shopItemPrice">$'.$item['price'].'</div>
                                <div class="App_shopItemButton">
                                <p>ADD TO CART</p>
                                </div>
                            </div>
                        </div>
                </div>';
            }
            ?>
            
            </div>
            
        </div>
        <div class="App_card">
            <div class="App_cardTop">
                <img src="./assets/nike.png" alt="" class="App_cardTopLogo">
            </div>
            <div class="App_cardTitle">Your cart
                <span class="App_cardTitleAmount">$0.00</span>
            </div>
            <div class="App_cardBody">
                <div class="App_cartEmpty" id="AddComment">
                    <div class="App_cartEmptyText">Your cart is empty</div>
                </div>
                <div>
                    <div id="content"></div>
                </div>
            </div>    
        </div>
    </div>
    <script src="./scripts.js"></script>
</body>
</html>
