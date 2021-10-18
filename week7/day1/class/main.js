fetch("https://restcountries.com/v2/all")
  .then((result) => result.json())
  .then((data) => {
    data.forEach((item) => {
      console.log(item);
      let elem = `<tr>
      <td>${item.alpha2Code}</td>
      <td class="img" style="background: url(${item.flag})"></td>
      <td>${item.name}</td>
      <td>${item.capital}</td>
      <td>${item.population}</td>
      </tr>`;
      $("tbody").append(elem);
    });
  });
