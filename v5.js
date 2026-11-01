<script>
(function(){
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var pin = document.getElementById('sceplenie');
  var trailer = document.getElementById('trailer'), cargo = document.getElementById('cargo');
  var tlText = document.getElementById('tlText');
  var items = [].slice.call(document.querySelectorAll('#rigList li'));
  var s2 = document.getElementById('s2'), s3 = document.getElementById('s3');
  function apply(p){
    // 0..0.4 — прицеп подъезжает и цепляется; 0.4..1 — кран поднимает груз
    var t = Math.min(1, p / 0.4);
    var tx = -60 * (1 - t);
    trailer.setAttribute('transform', 'translate(' + tx.toFixed(1) + ',0)');
    trailer.setAttribute('opacity', t.toFixed(2));
    tlText.setAttribute('opacity', t.toFixed(2));
    var c = Math.max(0, Math.min(1, (p - 0.45) / 0.4));
    cargo.setAttribute('opacity', c.toFixed(2));
    cargo.setAttribute('transform', 'translate(0,' + (-40 + 34 * c).toFixed(1) + ')');
    var w2 = Math.round(9 * t), total = 9 + w2;
    s2.textContent = w2;
    s3.textContent = total;
    var k = p < .3 ? 0 : (p < .62 ? 1 : 2);
    items.forEach(function(li,i){ li.classList.toggle('on', i === k); });
  }
  if (reduce) { apply(1); return; }
  apply(0);
  var raf = false;
  function upd(){
    raf = false;
    var r = pin.getBoundingClientRect(), span = r.height - innerHeight;
    var p = span > 0 ? Math.min(1, Math.max(0, -r.top / span)) : 1;
    apply(p);
  }
  addEventListener('scroll', function(){ if(!raf){raf=true;requestAnimationFrame(upd);} }, {passive:true});
  addEventListener('resize', upd);
  upd();
})();
</script>
</body>
</html>
