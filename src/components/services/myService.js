
export default class MyService{
    _apiBase = 'http://www.nbrb.by/API/ExRates/';
    _nowDate = new Date();
    _transformedNowDate = `${this._nowDate.getFullYear()}-${this._nowDate.getMonth()}-${this._nowDate.getDate()}`;
    _transformedDefaultStartDate = `${this._nowDate.getFullYear()-3}-${this._nowDate.getMonth()}-${this._nowDate.getDate()}`;
    _apiAdd= 'http://www.nbrb.by/API/ExRates/Rates/Dynamics/145?startDate=2016-6-1&endDate=2019-5-28';

    async getResource(url) {
        const res = await fetch(`${this._apiBase}${url}`);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}` +
                `, received ${res.status}`)
        }
        return await res.json();
    }

   async getCurrenciesLatest(){
       const currencies = await this.getResource('Rates?Periodicity=0');
       return currencies.map(this._transformCurrency).sort((a,b)=>{
           return a.value - b.value
       });
   }

   //можно брать с сервера за раз только 365 дней, обдумай как правильно взять данные
   async getCurrencyHistory(id_cur, startDate=this._transformedDefaultStartDate, lastDate=this._transformedNowDate)
   {
       const period = await this.getResource(`Rates/Dynamics/${id_cur}?startDate=${startDate}&endDate=${lastDate}`);
       console.log(period);
   }

   _transformCurrency(val)
   {
       return(
           {
               id:val.Cur_ID,
               name:val.Cur_Name,
               abbr:val.Cur_Abbreviation,
               value: val.Cur_OfficialRate,
               scale: val.Cur_Scale
           }
       );
   }
};
