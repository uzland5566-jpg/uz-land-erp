// =============================================
// API.GS — PWA uchun asosiy REST API
// Barcha so'rovlar shu fayldan o'tadi
// GAS Deploy: Anyone can access
// =============================================

function doGet(e) {
  var action = (e && e.parameter && e.parameter.action) ? e.parameter.action : '';

  var result;
  try {
    if      (action === 'ping')                    result = { success: true, ok: true };
    else if (action === 'checkLogin')              result = checkLogin(e.parameter.phone, e.parameter.password);
    else if (action === 'getDashboardStats')       result = getDashboardStats();
    else if (action === 'getBuyurtmalar')          result = getBuyurtmalar();
    else if (action === 'getLists')                result = getLists();
    else if (action === 'getLaserBuyurtmalar')     result = getLaserBuyurtmalar();
    else if (action === 'getLaserStats')           result = getLaserStats();
    else if (action === 'getChevarBuyurtmalar')    result = getChevarBuyurtmalar();
    else if (action === 'getChevarStats')          result = getChevarStats();
    else if (action === 'getQuyishBuyurtmalar')    result = getQuyishBuyurtmalar();
    else if (action === 'getQuyishStats')          result = getQuyishStats();
    else if (action === 'getQadoqlashBuyurtmalar') result = getQadoqlashBuyurtmalar();
    else if (action === 'getQadoqlashStats')       result = getQadoqlashStats();
    else if (action === 'getOmborBalans')          result = getOmborBalans();
    else if (action === 'getOmborStats')           result = getOmborStats();
    else if (action === 'getOmborQoldiq')          result = getOmborQoldiq();
    else if (action === 'getSotuvHistori')         result = getSotuvHistori();
    else if (action === 'getSotuvStats')           result = getSotuvStats();
    else if (action === 'getModellar')             result = getModellar();
    else if (action === 'getXomAshyoList')         result = getXomAshyoList();
    else if (action === 'getRetsepturaList')       result = getRetsepturaList();
    else if (action === 'getIshchilar')            result = getIshchilar();
    else if (action === 'getOylarRoyxati')         result = getOylarRoyxati();
    else if (action === 'getOyMalumotlari')        result = getOyMalumotlari(e.parameter.oy);
    else if (action === 'getOylikJami')            result = getOylikJami(e.parameter.oy);
    else if (action === 'getBugunStats')           result = getBugunStats(e.parameter.oy);
    else if (action === 'getAdminStats')           result = getAdminStats();
    else if (action === 'getKirimChiqim')          result = getKirimChiqim();
    else if (action === 'getXodimlar')             result = getXodimlar();
    // GET orqali ham ishlaydigan amallar
    else if (action === 'laserBoshlash')           result = laserBoshlash(parseInt(e.parameter.rowIndex));
    else if (action === 'laserBajarildi')          result = laserBajarildi(parseInt(e.parameter.rowIndex), parseInt(e.parameter.partiya));
    else if (action === 'chevarBoshlash')          result = chevarBoshlash(parseInt(e.parameter.rowIndex));
    else if (action === 'chevarBajarildi')         result = chevarBajarildi(parseInt(e.parameter.rowIndex), parseInt(e.parameter.partiya));
    else if (action === 'quyishBoshlash')          result = quyishBoshlash(parseInt(e.parameter.rowIndex));
    else if (action === 'quyishBajarildi')         result = quyishBajarildi(parseInt(e.parameter.rowIndex), parseInt(e.parameter.partiya));
    else if (action === 'qadoqlashBoshlash')       result = qadoqlashBoshlash(parseInt(e.parameter.rowIndex));
    else if (action === 'qadoqlashBajarildi')      result = qadoqlashBajarildi(parseInt(e.parameter.rowIndex), parseInt(e.parameter.partiya));
    else result = { success: true, message: 'UZ LAND API v1.0 ishlayapti ✅' };
  } catch(err) {
    result = { success: false, message: err.toString() };
  }

  return ContentService
    .createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  var body = {};
  try { body = JSON.parse(e.postData.contents); }
  catch(err) { return _json({ success: false, message: 'JSON parse xato: ' + err }); }

  var action = body.action || '';
  var result;
  try {
    if      (action === 'saveBuyurtma')              result = saveBuyurtma(body.data);
    else if (action === 'deleteBuyurtma')            result = deleteBuyurtma(body.rowIndex);
    else if (action === 'laserQismanBajarildi')      result = laserQismanBajarildi(body.rowIndex, body.yaxshi, body.brak, body.partiya);
    else if (action === 'chevarQismanBajarildi')     result = chevarQismanBajarildi(body.rowIndex, body.yaxshi, body.brak, body.partiya);
    else if (action === 'quyishQismanBajarildi')     result = quyishQismanBajarildi(body.rowIndex, body.yaxshi, body.brak, body.partiya);
    else if (action === 'qadoqlashQismanBajarildi')  result = qadoqlashQismanBajarildi(body.rowIndex, body.yaxshi, body.brak, body.partiya);
    else if (action === 'saveSotuv')                 result = saveSotuv(body.data);
    else if (action === 'saveRetseptura')            result = saveRetseptura(body.mahsulot, body.xomAshyo, body.sarf1dona, body.metrPar, body.kerakPar);
    else if (action === 'deleteRetseptura')          result = deleteRetseptura(body.rowIndex);
    else if (action === 'yozuvQosh')                 result = yozuvQosh(body.sana, body.ishchi, body.model, body.miqdor, body.narx);
    else if (action === 'yozuvOchir')                result = yozuvOchir(body.oyVaraqNomi, body.qatorRaqam);
    else if (action === 'saveKirim')                 result = saveKirim(body.data);
    else if (action === 'saveChiqim')                result = saveChiqim(body.data);
    else result = { success: false, message: "Noma'lum action: " + action };
  } catch(err) {
    result = { success: false, message: err.toString() };
  }

  return _json(result);
}

function _json(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
