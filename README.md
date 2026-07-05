# expansiontag

すべての機能は `<script type="メディア/エフェクト/パラメータ">` の形式で呼び出します。内部のテキストや画像を自動でキャッチし、動的にアニメーションを適用します。

---

## 1. 点滅 (blink)
文字を昔のネットスケープブラウザのようにチカチカと点滅させます。

### 書き方
```html
<script type="text/blink">
    <span style="color: red;">【警告】この文字は点滅します。</span>
</script>
```

---

## 2. 七色変化 (rainbow)
文字色を滑らかに七色（レインボー）のグラデーションで変化させます。画像の場合は極太の七色枠線がつきます。

### 書き方 (テキスト)
```html
<script type="text/rainbow">
    <h3>ようこそ！僕のホームページへ！</h3>
</script>
```

### 書き方 (画像)
```html
<script type="img/rainbow">
    https://example.com
</script>
```

---

## 3. 横スクロール (slide)
文字や画像を右から左へ流します（クラシックなmarquee効果）。末尾に `/alternate` を付けると、左右の壁でピンポンマシーンのように往復します。

### 書き方 (無限スクロール)
```html
<script type="text/slide">
    <span>最新ニュース：右から左へ無限にスクロールします。</span>
</script>
```

### 書き方 (左右往復)
```html
<script type="text/slide/alternate">
    <span>画面の端で跳ね返るテキストです。</span>
</script>
```

---

## 4. 水面ゆらゆら (water)
水面に浮かんでいるようにグニャグニャと歪みながら流体のように揺れます。末尾にミリ秒（`ms`）を指定して揺れる周期（速度）を自由に変更できます。

### 書き方
```html
<script type="text/water/1000ms">
    <h3 style="color: blue;">裏ページへようこそ……</h3>
</script>
```

---

## 5. 範囲全体の振動 (shake)
指定したピクセル数の範囲で、囲んだ中身全体をX軸・Y軸方向へガタガタと激しくシェイク（振動）させます。

### 書き方
```html
<script type="text/shake/30px/15px">
    <div style="background-color: red;">システムエラー発生</div>
</script>
```

---

## 6. 着地ジャンプ (jump)
指定したピクセル数の高さまで、中身全体が垂直に跳ね続けます。着地の瞬間にカートゥーンアニメのようにぷにっと縦につぶれる（スクワッシュ）効果が自動で入ります。

### 書き方
```html
<script type="text/jump/50px">
    <h2>ぴょん！</h2>
</script>
```

English

All effects are triggered using the `<script type="media/effect/parameters">` syntax. The engine automatically captures the inner text or images and applies the animations dynamically.

---

## 1. Blinking (blink)
Makes text flash on and off rapidly, perfectly replicating the legendary Netscape Navigator behavior.

### Usage
```html
<script type="text/blink">
    <span style="color: red;">[WARNING] This text will blink.</span>
</script>
```

---

## 2. Rainbow Color (rainbow)
Cycles text colors smoothly through a full rainbow gradient. For images, it wraps them in a thick, animated rainbow border.

### Usage (Text)
```html
<script type="text/rainbow">
    <h3>Welcome to my homepage!</h3>
</script>
```

### Usage (Image)
```html
<script type="img/rainbow">
    https://example.com
</script>
```

---

## 3. Horizontal Scrolling (slide)
Moves elements horizontally across the screen (classic marquee effect). Appending `/alternate` makes the element bounce back and forth between the edges.

### Usage (Infinite Loop)
```html
<script type="text/slide">
    <span>Breaking News: This text scrolls endlessly from right to left.</span>
</script>
```

### Usage (Bouncing)
```html
<script type="text/slide/alternate">
    <span>This text bounces back and forth like a ping-pong ball.</span>
</script>
```

---

## 4. Water Wave (water)
Distorts and skews the content to simulate a wavy fluid motion on a water surface. You can customize the animation speed using milliseconds (`ms`) at the end.

### Usage
```html
<script type="text/water/1000ms">
    <h3 style="color: blue;">Welcome to the underworld...</h3>
</script>
```

---

## 5. Screen Shaking (shake)
Aggressively shakes the entire enclosed container within a specified pixel range on the X and Y axes.

### Usage
```html
<script type="text/shake/30px/15px">
    <div style="background-color: red;">SYSTEM ERROR DETECTED</div>
</script>
```

---

## 6. Squeezed Jumping (jump)
Makes the content jump vertically up to a specified pixel height, adding a cartoon-like squash effect when landing.

### Usage
```html
<script type="text/jump/50px">
    <h2>Boing!</h2>
</script>
```
