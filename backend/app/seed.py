"""
seed.py — Inserts product data with Cloudinary-hosted images.
Run: python -m app.seed
"""
from app.db import SessionLocal
from app.models.product import Product
from app.models.order import Order, OrderItem

db = SessionLocal()

# Clear old test data (order_items first, due to foreign key)
db.query(OrderItem).delete()
db.query(Order).delete()
db.query(Product).delete()
db.commit()

products = [
    Product(
        name="3 Piece Printed Lawn Suit with Embroidered Details – Stitched",
        slug="printed-lawn-suit-embroidered",
        description="""**Shirt**
            1 PC Solid Shirt
            Embroidered Neckline
            Embroidered Sleeve Borders
            Fabric: Silk / Satin

            **Dupatta**
            1 PC Printed Dupatta
            Contrast Embroidered Border
            Fabric: Chiffon

            **Bottom**
            1 PC Matching Trouser
            Fabric: Silk""",
        color="Sage Green & Teal",
        price=6500,
        category="Eastern",
        image_url="https://res.cloudinary.com/s8opimu8/image/upload/v1789318792/product1.webp",
        stock=8,
    ),
    Product(
            name="Moonlit Bloom – 3 Piece Suit",
            slug="moonlit-bloom-3-piece-suit",
            description="""**Shirt**
                1 PC Solid Shirt
                Embroidered Neckline
                Embroidered Sleeve Borders
                Subtle Embellished Details
                Fabric: Dyed
    
                **Dupatta**
                1 PC Floral Printed Dupatta
                Embroidered/Lace Border
                Floral Printed All Over
                Fabric: Chiffon
    
                **Bottom**
                1 PC Dyed Trousers
                Fabric: Dyed""",
            color="Mist Grey & Navy Blue",
            price=5500,
            category="Eastern",
            image_url="https://res.cloudinary.com/s8opimu8/image/upload/v1789318792/product2.webp",
            stock=8,
        ),
    Product(
                name="Azure Bloom – 3 Piece Suit",
                slug="azure-bloom-3-piece-suit",
                description="""**Shirt**
                    1 PC Solid Shirt
                    Embroidered Neckline
                    Embroidered Front Detailing
                    Printed Floral Hem
                    Embellished Sleeve Borders
                    Fabric: Dyed
        
                    **Dupatta**
                    1 PC Dyed Dupatta
                    Embroidered/Lace Border
                    Floral Printed All Over
                    Fabric: Chiffon
        
                    **Bottom**
                    1 PC Dyed Trousers
                    Fabric: Dyed""",
                color="Ivory & Powder Blue",
                price=6600,
                category="Eastern",
                image_url="https://res.cloudinary.com/s8opimu8/image/upload/v1789318792/product3.webp",
                stock=9,
            ),
    Product(
                name="Mauve Blossom – 3 Piece Suit",
                slug="mauve-blossom-3-piece-suit",
                description="""**Shirt**
                    1 PC Solid Shirt
                    Embroidered Front & Hem Border
                    Embroidered Sleeve Borders
                    Floral Embellished Detailing
                    Fabric: Dyed
        
                    **Dupatta**
                    1 PC Floral Printed Dupatta
                    Floral Embroidered Border
                    Embroidered Floral Details
                    Fabric: Chiffon
        
                    **Bottom**
                    1 PC Dyed Trousers
                    Embroidered Hem Border
                    Fabric: Dyed""",
                color="Dusty Mauve & Black",
                price=7800,
                category="Eastern",
                image_url="https://res.cloudinary.com/s8opimu8/image/upload/v1789318793/product4.webp",
                stock=8,
            ),
]

db.add_all(products)
db.commit()
db.close()
print(f"Seeded {len(products)} products.")