function createCard(house) {
  const template = `<div class="card">
    <div class="card-header">
      <div class="card-img" style="background-image:url('${house.img}') "></div>
    </div>
  <div class="card-body">
    <h2 class="card-title">${house.name}</h2>
    <p class="card-description">${house.desc}</p>
  <button class="card-button">I want it!</button>
  </div>
  </div>`;

  return template;
}

export default createCard;
