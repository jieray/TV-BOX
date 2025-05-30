const baseParse = _ => {
    let d = [];

    d.push({
        desc: '48',
        url: 'file:///storage/emulated/0/Android/data/com.example.hikerview/files/Documents/rules/TyrantG/public/douyu-tabs.html',
        col_type: "x5_webview_single"
    })

    const list_json = fetch("https://m.douyu.com/api/home/mix");
    const list = JSON.parse(list_json)

    list.data.forEach(element => {
        let category_url = "https://m.douyu.com/api/room/list?page=fypage&type=" + element.shortName
        d.push({
            title: element.cate2Info[0].cate2Name,
            pic_url: element.icon,
            url: $(category_url).rule(_ => {
                eval(fetch('hiker://files/rules/TyrantG/LIVE/douyu.js'))
                categoryParse()
            }),
            col_type: 'avatar'
        })

        element.list.forEach(item => {
            d.push({
                title: item.roomName,
                desc: item.nickname,
                pic_url: item.roomSrc,
                url: $("https://m.douyu.com/" + item.rid).lazyRule(_ => {
                    eval(fetch('hiker://files/rules/TyrantG/LIVE/douyu.js'))
                    return secParse(input)
                }),
                col_type: 'movie_2'
            })
        })
        d.push({
            col_type: 'line_blank'
        })
    });

    setResult(d);
}

const secParse = input => {
    const html = fetch(input)

    // const rid = parseInt(input.replace("https://m.douyu.com/", ""))
    const rid = html.match(/rid":(.*?),"vipId/)[1]
    const tt = Date.parse(new Date()).toString().substr(0, 10)
    const did = "10000000000000000000000000001501"

    let param_body = getSign(html, rid, did, tt)

    const stream_json = fetch('https://m.douyu.com/api/room/ratestream', {
        headers: {'content-type': 'application/x-www-form-urlencoded'},
        body: param_body,
        method: 'POST'
    })
    const stream = JSON.parse(stream_json).data

    return stream.url
}

const _secParse = _ => {
    let res = {};
    let d = [];
    const html = getResCode();
    const script_raw = parseDomForHtml(html, "script&&Html");

    const script = script_raw.substring(0, script_raw.length - 569);

    eval(script)

    const rid = parseInt(MY_URL.replace("https://m.douyu.com/", ""))
    const tt = Date.parse(new Date()).toString().substr(0, 10)
    const did = "10000000000000000000000000001501"

    let param_body = getSign(html, rid, did, tt)

    const stream_json = fetch('https://m.douyu.com/api/room/ratestream', {
        headers: {'content-type': 'application/x-www-form-urlencoded'},
        body: param_body,
        method: 'POST'
    })
    const stream = JSON.parse(stream_json).data

    const url = $(stream.url).rule((data) => {
        let d = [];
        d.push({
            desc: '100% && float',
            url: 'file:///storage/emulated/0/Android/data/com.example.hikerview/files/Documents/TyrantG/public/douyu-player.html?time=' + (new Date()).getTime() + '&rid=' + data.rid + '&source=' + encodeURIComponent(MY_URL),
            col_type: "x5_webview_single",
        })
        setResult(d);
    }, {rid: rid})

    d.push({
        title: $ROOM.roomName,
        pic_url: $ROOM.roomSrc,
        desc: $ROOM.desc,
        url: stream.url,
        col_type: 'pic_1'
    })

    d.push({
        title: "直接观看",
        url: stream.url,
        col_type: 'text_2'
    })
    d.push({
        title: "弹幕播放器（测试）",
        url: url,
        col_type: 'text_2'
    })

    res.data = d;
    setHomeResult(res);
}

const categoryParse = _ => {
    let d = [];
    const html = getResCode();
    const list = JSON.parse(html).data

    list.list.forEach(item => {
        d.push({
            title: item.roomName,
            desc: item.nickname,
            pic_url: item.roomSrc,
            url: $("https://m.douyu.com/" + item.rid).lazyRule(_ => {
                eval(fetch('hiker://files/rules/TyrantG/LIVE/douyu.js'))
                return secParse(input)
            }),
            col_type: 'movie_2'
        })
    })


    setResult(d);
}

const searchParse = () => {
    let d = [];
    const html = getResCode();
    const list = JSON.parse(html).data

    list.list.forEach(item => {
        d.push({
            title: item.nickname,
            desc: item.roomName,
            pic_url: item.roomSrc,
            url: $("https://m.douyu.com/" + item.roomId).lazyRule(_ => {
                eval(fetch('hiker://files/rules/TyrantG/LIVE/douyu.js'))
                return secParse(input)
            }),
            col_type: 'movie_2'
        })
    })

    setResult(d);
}

const cateGroupParse = _ => {
    let d = []
    let list_json = fetch(MY_URL)
    let list = JSON.parse(list_json).data
    list.cate2Info.forEach(cate2 => {
        let category_url = "https://m.douyu.com/api/room/list?page=fypage&type=" + cate2.shortName
        d.push({
            title: cate2.cate2Name,
            pic_url: cate2.icon,
            url: $(category_url).rule(_ => {
                eval(fetch('hiker://files/rules/TyrantG/LIVE/douyu.js'))
                categoryParse()
            }),
            col_type: "icon_round_4"
        });
    });
    setResult(d);
}

const getSign = (script, rid, did, tt) => {

    let result = script.match(/(function ub98484234.*)\s(var.*)/)[0]
    let func_ub9 = result.replace(/eval.*;}/, 'strc;}', result)
    eval(func_ub9)

    let res = ub98484234()
    let v = res.match(/v=(\d+)/)[0].replace("v=", '')
    let rb = md5(rid + did + tt + v)

    let func_sign = res.replace(/return rt;}\);?/, 'return rt;}')
    func_sign = func_sign.replace('(function (', 'function sign(')
    func_sign = func_sign.replace('CryptoJS.MD5(cb).toString()', '"' + rb + '"')
    eval(func_sign)

    let params = sign(rid, did, tt) + "&ver=219032101&rid={}&rate=-1&rid=" + rid
    return params
}
