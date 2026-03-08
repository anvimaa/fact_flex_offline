const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["agt_logo.png","avatars/amantente.jpg","fact_logo.svg","favicon.ico","grid.svg","grid3.svg","images/dash-dark.png","images/dash-white.png","images/equipe/avm.jpg","images/equipe/vunge.jpg","images/github-logo.svg","images/google-logo.svg","images/login-illustration-new.svg","images/login-illustration.svg","images/parceiros/amantente.jpg","images/parceiros/serv-contas.jpg","images/register-illustration.svg","paypay.png","paypayclick.png","uploads/1732451923266.png","uploads/1732452027855.png","uploads/1732452139893.png","uploads/1732452403002.png","uploads/1732452427865.png","uploads/1732452663722.png","uploads/1732473338279.png","uploads/1732473920228.png","uploads/1732473925191.jpeg","uploads/1732661364084.png","uploads/1732733035901-20230522_160844_0000.png","uploads/1732954181206.jpg","uploads/1732954182604.jpg","uploads/1732954277760.png","uploads/1732954287851.png","uploads/1732954288858.png","uploads/1732954729471.jpg","uploads/1732954731248.jpg","uploads/1732954965960.png","uploads/1732955181459.png","uploads/1733055151594.png","uploads/1733055350177.jpg","uploads/1733055464519.png","uploads/1733056793636.png","uploads/1733058605216-Super Man tema.pdf","uploads/1733059133183-Super Man tema.pdf","uploads/1733059518398-Super Man tema.pdf","uploads/1733059601134-Screenshot 2024-11-20 203145.png","uploads/1733062003500-Screenshot 2024-11-20 203145.png","uploads/1733062050686-Screenshot 2024-11-22 052816.png","uploads/1733164652022.png","uploads/1733231783233-Super Man tema.pdf","uploads/1734964839820.jpg","uploads/1734965013232.jpg","uploads/1734965160377.jpg","uploads/1752140398320.jpg","uploads/1752140660214-factura-FT-2025_0004 (1).pdf","uploads/1752234647170-factura-anulado-FT 2025_0002.pdf","uploads/1752234811889-factura-anulado-FT 2025_0002.pdf","uploads/1752234814428-factura-anulado-FT 2025_0002.pdf","uploads/1752234815224-factura-anulado-FT 2025_0002.pdf","uploads/1752234815842-factura-anulado-FT 2025_0002.pdf","uploads/1752234907668-factura-cliente-FT 2025_0001.pdf","uploads/1752235755252-factura-anulado-FT 2025_0002.pdf","uploads/1752235756999-factura-anulado-FT 2025_0002.pdf","uploads/1752235757820-factura-anulado-FT 2025_0002.pdf","uploads/1752235819605-factura-cliente-FT 2025_0001.pdf","uploads/1752235971708-proforma-PP 2025_0001.pdf","uploads/1752236211342-factura-anulado-FT 2025_0002.pdf","uploads/1752236214645-factura-anulado-FT 2025_0002.pdf","uploads/1752236215404-factura-anulado-FT 2025_0002.pdf","uploads/1764926785869.png","uploads/1770586834009.png","uploads/1770662653500.png","uploads/1770843138797.png","uploads/1771353484435.avif","uploads/1771532061112.png","uploads/1771665683807.png","uploads/1771666481978.png","uploads/1772041051663.png","uploads/1772110392632.png","uploads/1772302436498.png","uploads/1772737769542.png","uploads/1772755009119.png","uploads/profile--ZG-M_O8JPeYOuMBuIXp7-1733168883556.png","uploads/profile--ZG-M_O8JPeYOuMBuIXp7-1733169233932.png","uploads/profile--ZG-M_O8JPeYOuMBuIXp7-1733169294500.png","uploads/profile-RsxX15qP8mdpt_b9nExVG-1750963842441.jpg","uploads/profile-RsxX15qP8mdpt_b9nExVG-1752140448627.png","uploads/profile-gX1BJ3b9KF3MKh57FgVIX-1770840457613.png","uploads/proofFiles/1752479906578-factura-anulado-FT 2025_0002.pdf","uploads/proofFiles/1752480292444-5-factura-M14-FT 2025_0004.pdf","uploads/proofFiles/1752574625480-factura-cliente-FT 2025_0001.pdf"]),
	mimeTypes: {".png":"image/png",".jpg":"image/jpeg",".svg":"image/svg+xml",".jpeg":"image/jpeg",".pdf":"application/pdf",".avif":"image/avif"},
	_: {
		client: {start:"_app/immutable/entry/start.BfMGrdk4.js",app:"_app/immutable/entry/app.Dp_-fJgB.js",imports:["_app/immutable/entry/start.BfMGrdk4.js","_app/immutable/chunks/TGl8V12P.js","_app/immutable/chunks/D0bGOvIJ.js","_app/immutable/chunks/CoUivBMM.js","_app/immutable/chunks/DwlJeGO9.js","_app/immutable/chunks/zueKD4i-.js","_app/immutable/entry/app.Dp_-fJgB.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/CoUivBMM.js","_app/immutable/chunks/DwlJeGO9.js","_app/immutable/chunks/CWj6FrbW.js","_app/immutable/chunks/D0bGOvIJ.js","_app/immutable/chunks/aqOW1qDw.js","_app/immutable/chunks/B711HfnL.js","_app/immutable/chunks/B5vPnWyC.js","_app/immutable/chunks/hdEfbS_i.js","_app/immutable/chunks/BeM9_8ch.js","_app/immutable/chunks/00M-5JKi.js","_app/immutable/chunks/zueKD4i-.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./chunks/0-C1uUawQ6.js')),
			__memo(() => import('./chunks/1-X5WDz886.js')),
			__memo(() => import('./chunks/2-Uw2k-hPE.js')),
			__memo(() => import('./chunks/3-FJbBLO9o.js')),
			__memo(() => import('./chunks/4-CfIpSA56.js')),
			__memo(() => import('./chunks/5-sdjqsbLk.js')),
			__memo(() => import('./chunks/6-DX6soKWp.js')),
			__memo(() => import('./chunks/7-uxK3r3bN.js')),
			__memo(() => import('./chunks/8-T10s_9z5.js')),
			__memo(() => import('./chunks/9-C9p6j1bb.js')),
			__memo(() => import('./chunks/10-oDYSgNd_.js')),
			__memo(() => import('./chunks/11-EO-RkToG.js')),
			__memo(() => import('./chunks/12-CxIBPtVw.js')),
			__memo(() => import('./chunks/13-DYF__-A_.js')),
			__memo(() => import('./chunks/14-BJI7HOYv.js')),
			__memo(() => import('./chunks/15-CfjvnSXc.js')),
			__memo(() => import('./chunks/16-C0ubosJp.js')),
			__memo(() => import('./chunks/17-Bkf9GbTI.js')),
			__memo(() => import('./chunks/18-lk57yQEl.js')),
			__memo(() => import('./chunks/19-ChTahX_p.js')),
			__memo(() => import('./chunks/20-hJadv2AX.js')),
			__memo(() => import('./chunks/21-CWnpSEvY.js')),
			__memo(() => import('./chunks/22-BsKalZmI.js')),
			__memo(() => import('./chunks/23-Dphw4Klu.js')),
			__memo(() => import('./chunks/24-CokgBpLm.js')),
			__memo(() => import('./chunks/25-BsMUIcgX.js')),
			__memo(() => import('./chunks/26-B_bdxh-8.js')),
			__memo(() => import('./chunks/27-UxKy5Fcb.js')),
			__memo(() => import('./chunks/28-D2W1LblC.js')),
			__memo(() => import('./chunks/29-DWx0Cy8h.js')),
			__memo(() => import('./chunks/30-tfuzK2vR.js')),
			__memo(() => import('./chunks/31-DRC_yr5B.js')),
			__memo(() => import('./chunks/32-BiaOF3VH.js')),
			__memo(() => import('./chunks/33-CqhXrzYn.js')),
			__memo(() => import('./chunks/34-wkXrh6YC.js')),
			__memo(() => import('./chunks/35-MhnzIJD0.js')),
			__memo(() => import('./chunks/36-BNRCqshO.js')),
			__memo(() => import('./chunks/37-CALQi7AJ.js')),
			__memo(() => import('./chunks/38-CcQNvqfS.js')),
			__memo(() => import('./chunks/39-DosPpUJg.js')),
			__memo(() => import('./chunks/40-C9ra99Fw.js')),
			__memo(() => import('./chunks/41-1Ath8bt7.js')),
			__memo(() => import('./chunks/42-CbK3VDlf.js')),
			__memo(() => import('./chunks/43-N-2UKnm2.js')),
			__memo(() => import('./chunks/44-OQ2oYQZI.js')),
			__memo(() => import('./chunks/45-puW-9bDG.js')),
			__memo(() => import('./chunks/46-DfituAyX.js')),
			__memo(() => import('./chunks/47-p7FdQAeJ.js')),
			__memo(() => import('./chunks/48-CjlF7STN.js')),
			__memo(() => import('./chunks/49-DCwFL0NB.js')),
			__memo(() => import('./chunks/50-gj2fmf2B.js')),
			__memo(() => import('./chunks/51-D_8XXPkv.js')),
			__memo(() => import('./chunks/52-CY6GduG8.js')),
			__memo(() => import('./chunks/53-5LoD-uDt.js')),
			__memo(() => import('./chunks/54-DzA2DBra.js')),
			__memo(() => import('./chunks/55-DdM1upf1.js')),
			__memo(() => import('./chunks/56-btSQThj3.js')),
			__memo(() => import('./chunks/57-FpOfswRJ.js')),
			__memo(() => import('./chunks/58-ZKHqQWNL.js')),
			__memo(() => import('./chunks/59-CANqwl0m.js')),
			__memo(() => import('./chunks/60-CytGjRLy.js')),
			__memo(() => import('./chunks/61-DwoWfEfV.js')),
			__memo(() => import('./chunks/62-CIlcHn6S.js')),
			__memo(() => import('./chunks/63-C09v3ssF.js')),
			__memo(() => import('./chunks/64-Rw5E3gC4.js')),
			__memo(() => import('./chunks/65-C2PfkTom.js')),
			__memo(() => import('./chunks/66-O6leFxTQ.js')),
			__memo(() => import('./chunks/67-KLW8eRbo.js')),
			__memo(() => import('./chunks/68-CrGbuvEi.js')),
			__memo(() => import('./chunks/69-int3SjU6.js')),
			__memo(() => import('./chunks/70-Cb23bjCk.js')),
			__memo(() => import('./chunks/71-B5nCGez4.js')),
			__memo(() => import('./chunks/72-BLmvQhEw.js')),
			__memo(() => import('./chunks/73-CQJ1GZn0.js')),
			__memo(() => import('./chunks/74-BsTek__O.js')),
			__memo(() => import('./chunks/75-BOJoUln8.js')),
			__memo(() => import('./chunks/76-Bvy4lkPc.js')),
			__memo(() => import('./chunks/77-DtZH9a-5.js')),
			__memo(() => import('./chunks/78-CgklD-cv.js')),
			__memo(() => import('./chunks/79-CQH65urO.js')),
			__memo(() => import('./chunks/80-CZPt_8ee.js')),
			__memo(() => import('./chunks/81-BtddzuDK.js')),
			__memo(() => import('./chunks/82-CQDGq_IK.js')),
			__memo(() => import('./chunks/83-DYtMErzd.js')),
			__memo(() => import('./chunks/84-6syAQOOX.js')),
			__memo(() => import('./chunks/85-CsJwInr8.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/(landing)",
				pattern: /^\/?$/,
				params: [],
				page: { layouts: [0,4,], errors: [1,,], leaf: 63 },
				endpoint: null
			},
			{
				id: "/(admin)/admin",
				pattern: /^\/admin\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/(admin)/admin/comissoes",
				pattern: /^\/admin\/comissoes\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/(admin)/admin/empresas",
				pattern: /^\/admin\/empresas\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/(admin)/admin/empresas/[id]",
				pattern: /^\/admin\/empresas\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,2,], errors: [1,,], leaf: 8 },
				endpoint: null
			},
			{
				id: "/(admin)/admin/login",
				pattern: /^\/admin\/login\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 9 },
				endpoint: null
			},
			{
				id: "/(admin)/admin/logout",
				pattern: /^\/admin\/logout\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 10 },
				endpoint: null
			},
			{
				id: "/(admin)/admin/pagamentos",
				pattern: /^\/admin\/pagamentos\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 11 },
				endpoint: null
			},
			{
				id: "/(admin)/admin/parceiros",
				pattern: /^\/admin\/parceiros\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 12 },
				endpoint: null
			},
			{
				id: "/(admin)/admin/users",
				pattern: /^\/admin\/users\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 13 },
				endpoint: null
			},
			{
				id: "/(app)/analises",
				pattern: /^\/analises\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,,], leaf: 14 },
				endpoint: null
			},
			{
				id: "/api/admin/empresas",
				pattern: /^\/api\/admin\/empresas\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server.ts-D4bFP_N2.js'))
			},
			{
				id: "/api/admin/empresas/[id]",
				pattern: /^\/api\/admin\/empresas\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: __memo(() => import('./chunks/_server.ts-Co5APamr.js'))
			},
			{
				id: "/api/admin/parceiros",
				pattern: /^\/api\/admin\/parceiros\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server.ts-DMfAnnvp.js'))
			},
			{
				id: "/api/admin/payments",
				pattern: /^\/api\/admin\/payments\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server.ts-ChQCaPm4.js'))
			},
			{
				id: "/api/admin/payments/[id]/approve",
				pattern: /^\/api\/admin\/payments\/([^/]+?)\/approve\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: __memo(() => import('./chunks/_server.ts-sXaww4iC.js'))
			},
			{
				id: "/api/admin/payments/[id]/reject",
				pattern: /^\/api\/admin\/payments\/([^/]+?)\/reject\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: __memo(() => import('./chunks/_server.ts-iUp-2WHg.js'))
			},
			{
				id: "/api/admin/users",
				pattern: /^\/api\/admin\/users\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server.ts-D_T2pBmT.js'))
			},
			{
				id: "/api/admin/users/[id]/toggle-status",
				pattern: /^\/api\/admin\/users\/([^/]+?)\/toggle-status\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: __memo(() => import('./chunks/_server.ts-DP7wh3Gm.js'))
			},
			{
				id: "/api/agt/consultar-nif",
				pattern: /^\/api\/agt\/consultar-nif\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server.ts-Dq-fiyL8.js'))
			},
			{
				id: "/api/categorias/[id]",
				pattern: /^\/api\/categorias\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: __memo(() => import('./chunks/_server.ts-CqEWZ-MW.js'))
			},
			{
				id: "/api/clientes",
				pattern: /^\/api\/clientes\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server.ts-WnPXZIst.js'))
			},
			{
				id: "/api/clientes/busca",
				pattern: /^\/api\/clientes\/busca\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server.ts-C9SqeNzr.js'))
			},
			{
				id: "/api/contact",
				pattern: /^\/api\/contact\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server.ts-B_Jf_Lf-.js'))
			},
			{
				id: "/api/empresa",
				pattern: /^\/api\/empresa\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server.ts-D2Y328ns.js'))
			},
			{
				id: "/api/estoque",
				pattern: /^\/api\/estoque\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server.ts-DBynI5mx.js'))
			},
			{
				id: "/api/facturacao/nova",
				pattern: /^\/api\/facturacao\/nova\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server.ts-DGg1K5l-.js'))
			},
			{
				id: "/api/fornecedores/[id]",
				pattern: /^\/api\/fornecedores\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: __memo(() => import('./chunks/_server.ts-D4xEydDP.js'))
			},
			{
				id: "/api/invoice/send-email",
				pattern: /^\/api\/invoice\/send-email\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server.ts-BNAMOZtA.js'))
			},
			{
				id: "/api/newsletter",
				pattern: /^\/api\/newsletter\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server.ts-BIUhndYr.js'))
			},
			{
				id: "/api/payments",
				pattern: /^\/api\/payments\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server.ts-B1r-k-H9.js'))
			},
			{
				id: "/api/payments/paypay",
				pattern: /^\/api\/payments\/paypay\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server.ts-BlvULsNw.js'))
			},
			{
				id: "/api/payments/paypay/express",
				pattern: /^\/api\/payments\/paypay\/express\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server.ts-ChyxZ66O.js'))
			},
			{
				id: "/api/payments/paypay/reference",
				pattern: /^\/api\/payments\/paypay\/reference\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server.ts-BdXuUPfG.js'))
			},
			{
				id: "/api/produtos/busca",
				pattern: /^\/api\/produtos\/busca\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server.ts-D5-CW8Gf.js'))
			},
			{
				id: "/api/produtos/[id]",
				pattern: /^\/api\/produtos\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: __memo(() => import('./chunks/_server.ts-D5ju1WzM.js'))
			},
			{
				id: "/api/profile/update",
				pattern: /^\/api\/profile\/update\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server.ts-vyiDvmwp.js'))
			},
			{
				id: "/api/profile/upload-image",
				pattern: /^\/api\/profile\/upload-image\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server.ts-DgjQ2Tg6.js'))
			},
			{
				id: "/api/saft-ao",
				pattern: /^\/api\/saft-ao\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server.ts-CIWZtg_T.js'))
			},
			{
				id: "/api/taxas/[id]",
				pattern: /^\/api\/taxas\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: __memo(() => import('./chunks/_server.ts-BJFLmMq3.js'))
			},
			{
				id: "/api/upload",
				pattern: /^\/api\/upload\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server.ts-BOpAKtlA.js'))
			},
			{
				id: "/api/vendas",
				pattern: /^\/api\/vendas\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server.ts-DQLeGi5C.js'))
			},
			{
				id: "/(app)/cadastros/categorias",
				pattern: /^\/cadastros\/categorias\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,,], leaf: 15 },
				endpoint: null
			},
			{
				id: "/(app)/cadastros/clientes",
				pattern: /^\/cadastros\/clientes\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,,], leaf: 16 },
				endpoint: null
			},
			{
				id: "/(app)/cadastros/clientes/delete/[id]",
				pattern: /^\/cadastros\/clientes\/delete\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,3,], errors: [1,,], leaf: 18 },
				endpoint: null
			},
			{
				id: "/(app)/cadastros/clientes/editar/[id]",
				pattern: /^\/cadastros\/clientes\/editar\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,3,], errors: [1,,], leaf: 19 },
				endpoint: null
			},
			{
				id: "/(app)/cadastros/clientes/novo",
				pattern: /^\/cadastros\/clientes\/novo\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,,], leaf: 20 },
				endpoint: null
			},
			{
				id: "/(app)/cadastros/clientes/[id]",
				pattern: /^\/cadastros\/clientes\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,3,], errors: [1,,], leaf: 17 },
				endpoint: null
			},
			{
				id: "/(app)/cadastros/fornecedores",
				pattern: /^\/cadastros\/fornecedores\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,,], leaf: 21 },
				endpoint: null
			},
			{
				id: "/(app)/cadastros/produtos",
				pattern: /^\/cadastros\/produtos\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,,], leaf: 22 },
				endpoint: null
			},
			{
				id: "/(app)/cadastros/produtos/delete/[id]",
				pattern: /^\/cadastros\/produtos\/delete\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,3,], errors: [1,,], leaf: 25 },
				endpoint: null
			},
			{
				id: "/(app)/cadastros/produtos/novo",
				pattern: /^\/cadastros\/produtos\/novo\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,,], leaf: 26 },
				endpoint: null
			},
			{
				id: "/(app)/cadastros/produtos/[id]",
				pattern: /^\/cadastros\/produtos\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,3,], errors: [1,,], leaf: 23 },
				endpoint: null
			},
			{
				id: "/(app)/cadastros/produtos/[id]/edit",
				pattern: /^\/cadastros\/produtos\/([^/]+?)\/edit\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,3,], errors: [1,,], leaf: 24 },
				endpoint: null
			},
			{
				id: "/(app)/cadastros/taxas",
				pattern: /^\/cadastros\/taxas\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,,], leaf: 27 },
				endpoint: null
			},
			{
				id: "/(auth)/cadastro",
				pattern: /^\/cadastro\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 61 },
				endpoint: null
			},
			{
				id: "/(landing)/carreiras",
				pattern: /^\/carreiras\/?$/,
				params: [],
				page: { layouts: [0,4,], errors: [1,,], leaf: 64 },
				endpoint: null
			},
			{
				id: "/(app)/configuracoes/empresa",
				pattern: /^\/configuracoes\/empresa\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,,], leaf: 28 },
				endpoint: null
			},
			{
				id: "/(app)/configuracoes/impostos",
				pattern: /^\/configuracoes\/impostos\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,,], leaf: 29 },
				endpoint: null
			},
			{
				id: "/(app)/configuracoes/log-documentos",
				pattern: /^\/configuracoes\/log-documentos\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,,], leaf: 30 },
				endpoint: null
			},
			{
				id: "/(app)/configuracoes/saft",
				pattern: /^\/configuracoes\/saft\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,,], leaf: 31 },
				endpoint: null
			},
			{
				id: "/(app)/configuracoes/usuarios",
				pattern: /^\/configuracoes\/usuarios\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,,], leaf: 32 },
				endpoint: null
			},
			{
				id: "/(landing)/contato",
				pattern: /^\/contato\/?$/,
				params: [],
				page: { layouts: [0,4,], errors: [1,,], leaf: 65 },
				endpoint: null
			},
			{
				id: "/(landing)/cookies",
				pattern: /^\/cookies\/?$/,
				params: [],
				page: { layouts: [0,4,], errors: [1,,], leaf: 66 },
				endpoint: null
			},
			{
				id: "/(app)/dashboard",
				pattern: /^\/dashboard\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,,], leaf: 33 },
				endpoint: null
			},
			{
				id: "/(app)/documentos/eletronicos",
				pattern: /^\/documentos\/eletronicos\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,,], leaf: 34 },
				endpoint: null
			},
			{
				id: "/(app)/documentos/factura",
				pattern: /^\/documentos\/factura\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,,], leaf: 35 },
				endpoint: null
			},
			{
				id: "/(app)/documentos/factura/nova",
				pattern: /^\/documentos\/factura\/nova\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,,], leaf: 36 },
				endpoint: null
			},
			{
				id: "/(app)/documentos/fatura-adiantamento/nova",
				pattern: /^\/documentos\/fatura-adiantamento\/nova\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,,], leaf: 37 },
				endpoint: null
			},
			{
				id: "/(app)/documentos/fatura-global/nova",
				pattern: /^\/documentos\/fatura-global\/nova\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,,], leaf: 38 },
				endpoint: null
			},
			{
				id: "/(app)/documentos/fatura-global/selecao",
				pattern: /^\/documentos\/fatura-global\/selecao\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,,], leaf: 39 },
				endpoint: null
			},
			{
				id: "/(app)/documentos/fatura-recibo/nova",
				pattern: /^\/documentos\/fatura-recibo\/nova\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,,], leaf: 40 },
				endpoint: null
			},
			{
				id: "/(app)/documentos/fatura-simplificada/nova",
				pattern: /^\/documentos\/fatura-simplificada\/nova\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,,], leaf: 41 },
				endpoint: null
			},
			{
				id: "/(app)/documentos/fiscais",
				pattern: /^\/documentos\/fiscais\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,,], leaf: 42 },
				endpoint: null
			},
			{
				id: "/(app)/documentos/fiscais/[id]",
				pattern: /^\/documentos\/fiscais\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,3,], errors: [1,,], leaf: 43 },
				endpoint: null
			},
			{
				id: "/(app)/documentos/fiscais/[id]/logs",
				pattern: /^\/documentos\/fiscais\/([^/]+?)\/logs\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,3,], errors: [1,,], leaf: 44 },
				endpoint: null
			},
			{
				id: "/(app)/documentos/guias-remessa/nova",
				pattern: /^\/documentos\/guias-remessa\/nova\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,,], leaf: 45 },
				endpoint: null
			},
			{
				id: "/(app)/documentos/notas-credito/nova",
				pattern: /^\/documentos\/notas-credito\/nova\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,,], leaf: 46 },
				endpoint: null
			},
			{
				id: "/(app)/documentos/notas-debito/nova",
				pattern: /^\/documentos\/notas-debito\/nova\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,,], leaf: 47 },
				endpoint: null
			},
			{
				id: "/(app)/documentos/pro-forma",
				pattern: /^\/documentos\/pro-forma\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,,], leaf: 48 },
				endpoint: null
			},
			{
				id: "/(app)/documentos/pro-forma/nova",
				pattern: /^\/documentos\/pro-forma\/nova\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,,], leaf: 49 },
				endpoint: null
			},
			{
				id: "/(app)/documentos/recibos",
				pattern: /^\/documentos\/recibos\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,,], leaf: 50 },
				endpoint: null
			},
			{
				id: "/(app)/documentos/recibos/nova",
				pattern: /^\/documentos\/recibos\/nova\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,,], leaf: 51 },
				endpoint: null
			},
			{
				id: "/(app)/documentos/relatorios",
				pattern: /^\/documentos\/relatorios\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,,], leaf: 52 },
				endpoint: null
			},
			{
				id: "/(app)/documentos/series",
				pattern: /^\/documentos\/series\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,,], leaf: 53 },
				endpoint: null
			},
			{
				id: "/email-verified",
				pattern: /^\/email-verified\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 74 },
				endpoint: null
			},
			{
				id: "/empresa/criar",
				pattern: /^\/empresa\/criar\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 75 },
				endpoint: null
			},
			{
				id: "/empresa/criar/p1",
				pattern: /^\/empresa\/criar\/p1\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 76 },
				endpoint: null
			},
			{
				id: "/(app)/estoque",
				pattern: /^\/estoque\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,,], leaf: 54 },
				endpoint: null
			},
			{
				id: "/(app)/estoque/entrada",
				pattern: /^\/estoque\/entrada\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,,], leaf: 55 },
				endpoint: null
			},
			{
				id: "/(auth)/login",
				pattern: /^\/login\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 62 },
				endpoint: null
			},
			{
				id: "/pagamento",
				pattern: /^\/pagamento\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 77 },
				endpoint: null
			},
			{
				id: "/(landing)/parceiros",
				pattern: /^\/parceiros\/?$/,
				params: [],
				page: { layouts: [0,4,], errors: [1,,], leaf: 67 },
				endpoint: null
			},
			{
				id: "/(landing)/planos",
				pattern: /^\/planos\/?$/,
				params: [],
				page: { layouts: [0,4,], errors: [1,,], leaf: 68 },
				endpoint: null
			},
			{
				id: "/(landing)/privacidade",
				pattern: /^\/privacidade\/?$/,
				params: [],
				page: { layouts: [0,4,], errors: [1,,], leaf: 69 },
				endpoint: null
			},
			{
				id: "/(app)/profile/[id]",
				pattern: /^\/profile\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,3,], errors: [1,,], leaf: 56 },
				endpoint: null
			},
			{
				id: "/(app)/reports",
				pattern: /^\/reports\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,,], leaf: 57 },
				endpoint: null
			},
			{
				id: "/reports/factura",
				pattern: /^\/reports\/factura\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 78 },
				endpoint: null
			},
			{
				id: "/reports/factura/[id]",
				pattern: /^\/reports\/factura\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 79 },
				endpoint: null
			},
			{
				id: "/reports/proforma",
				pattern: /^\/reports\/proforma\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 80 },
				endpoint: null
			},
			{
				id: "/reports/proforma/[id]",
				pattern: /^\/reports\/proforma\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 81 },
				endpoint: null
			},
			{
				id: "/reports/recibos/[id]",
				pattern: /^\/reports\/recibos\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 82 },
				endpoint: null
			},
			{
				id: "/(landing)/servicos",
				pattern: /^\/servicos\/?$/,
				params: [],
				page: { layouts: [0,4,], errors: [1,,], leaf: 70 },
				endpoint: null
			},
			{
				id: "/(landing)/servicos/[slug]",
				pattern: /^\/servicos\/([^/]+?)\/?$/,
				params: [{"name":"slug","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,4,], errors: [1,,], leaf: 71 },
				endpoint: null
			},
			{
				id: "/sitemap.xml",
				pattern: /^\/sitemap\.xml\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server.ts-C5WWaxMp.js'))
			},
			{
				id: "/(landing)/sobre",
				pattern: /^\/sobre\/?$/,
				params: [],
				page: { layouts: [0,4,], errors: [1,,], leaf: 72 },
				endpoint: null
			},
			{
				id: "/subscription-expired",
				pattern: /^\/subscription-expired\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 83 },
				endpoint: null
			},
			{
				id: "/success",
				pattern: /^\/success\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 84 },
				endpoint: null
			},
			{
				id: "/(landing)/termos",
				pattern: /^\/termos\/?$/,
				params: [],
				page: { layouts: [0,4,], errors: [1,,], leaf: 73 },
				endpoint: null
			},
			{
				id: "/trial-expired",
				pattern: /^\/trial-expired\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 85 },
				endpoint: null
			},
			{
				id: "/(app)/venda",
				pattern: /^\/venda\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,,], leaf: 58 },
				endpoint: null
			},
			{
				id: "/(app)/venda/nova",
				pattern: /^\/venda\/nova\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,,], leaf: 60 },
				endpoint: null
			},
			{
				id: "/(app)/venda/[id]",
				pattern: /^\/venda\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,3,], errors: [1,,], leaf: 59 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();

const prerendered = new Set([]);

const base = "";

export { base, manifest, prerendered };
//# sourceMappingURL=manifest.js.map
