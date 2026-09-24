# Converte os plates de design/plates/ (e o logo real) para WebP em site/assets/.
# Uso: py scripts/build_assets.py
#
# Regras:
# - Plates saem em 2 larguras: 800 e 1600 px (lado horizontal), Lanczos.
#   Os originais tem 768-1376 px de largura, entao a variante 1600 e upscale
#   (ver assets.md).
# - Plates de fundo preto passam por um "black point" leve: tudo abaixo de
#   BLACK_POINT vira 0, para que mix-blend-mode: screen nao deixe a borda do
#   retangulo aparecer sobre --ink-900. Nada de recorte / alpha.
# - O logo (150 px) e so convertido, sem upscale.
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "design" / "plates"
IMG = ROOT / "IMAGENS"
OUT = ROOT / "site" / "assets"

WIDTHS = (800, 1600)
QUALITY = 82
BLACK_POINT = 8

# nome final -> (arquivo de origem, aplicar black point?)
PLATES = {
    "plate-smoke-hero":  ("plate-smoke-hero.jpeg.jpeg",  True),
    "plate-smoke-thin":  ("plate-smoke-thin.jpeg.jpeg",  True),
    "plate-smoke-floor": ("plate-smoke-floor.jpeg.jpeg", True),
    "plate-nigiri":      ("plate-nigiri.jpeg.jpeg",      True),
    "plate-board-left":  ("plate-board-left.jpeg.jpeg",  True),
    "plate-board-right": ("plate-board-right.jpeg.jpeg", True),
}

LOGO = "imgi_2_412624567_893134862433209_6900609809336659314_n.jpg"


def crush_blacks(im: Image.Image) -> Image.Image:
    lut = [0 if v < BLACK_POINT else round((v - BLACK_POINT) * 255 / (255 - BLACK_POINT))
           for v in range(256)]
    return im.point(lut * 3)


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    for name, (src, crush) in PLATES.items():
        im = Image.open(SRC / src).convert("RGB")
        if crush:
            im = crush_blacks(im)
        for w in WIDTHS:
            h = round(im.height * w / im.width)
            dst = OUT / f"{name}-{w}.webp"
            im.resize((w, h), Image.LANCZOS).save(dst, "WEBP", quality=QUALITY, method=6)
            print(f"{dst.name:28} {w}x{h}  {dst.stat().st_size // 1024} KB")

    logo = Image.open(IMG / LOGO).convert("RGB")
    dst = OUT / f"logo-asami-{logo.width}.webp"
    logo.save(dst, "WEBP", quality=90, method=6)
    print(f"{dst.name:28} {logo.width}x{logo.height}  {dst.stat().st_size // 1024} KB")


if __name__ == "__main__":
    main()
