document.addEventListener('DOMContentLoaded', () => {
    const layer0 = document.getElementById('layer0');
    const layer1 = document.getElementById('layer1');
    const layer2 = document.getElementById('layer2');
    const layer3 = document.getElementById('layer3');
    
    const btnRDC = document.getElementById('btnRDC');
    const btnDeuxiemeEtage = document.getElementById('btnDeuxiemeEtage');
    const btnPremierEtage = document.getElementById('btnPremierEtage');
    
    function showLayer(layerToShow) {
      layer0.style.display = 'block';
      layer1.style.display = 'none';
      layer2.style.display = 'none';
      layer3.style.display = 'none';
      
      if (layerToShow) {
        layerToShow.style.display = 'block';
      }
    }
  
    btnRDC.addEventListener('click', () => {
      showLayer(layer2);
    });
  
    btnDeuxiemeEtage.addEventListener('click', () => {
      showLayer(layer3);
    });
  
    btnPremierEtage.addEventListener('click', () => {
      showLayer(layer1);
    });
  });
  