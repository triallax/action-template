module.exports = (() => {
    var __webpack_modules__ = {
        932: (e, t, r) => {
            const s = r(326);
            const o = r(438);
            const n = r(195);
            async function getConfig() {
                const e = s.getInput("repo-token", { required: true });
                const t = s.getInput("days-until-close");
                const r = s.getInput("template-not-used-label");
                const o = s.getInput("template-not-used-comment-body");
                const n = s.getInput("doesnt-follow-template-label");
                const i = s.getInput("doesnt-follow-template-comment-body");
                return {
                    type: type,
                    daysUntilClose: t,
                    templateNotUsedLabel: r,
                    templateNotUsedCommentBody: o,
                    doesntFollowTemplateLabel: n,
                    doesntFollowTemplateCommentBody: i,
                    repoToken: e,
                };
            }
            async function interpolateValues(e, t) {
                const r = o.context;
                const s = o.getOctokit(t.repoToken);
                const n = await s.issues.get(r.issue);
                const i = n.data.user.login;
                e = e.replace("{authorLogin}", i);
                let c = t.daysUntilClose;
                if (c === 1) {
                    c = "1 day";
                } else {
                    c = `${c} days`;
                }
                e = e.replace("{daysUntilClose}", c);
                return e;
            }
            async function run() {
                try {
                    const e = getConfig();
                    switch (e.type) {
                        case "comment": {
                            const t = o.getOctokit(e.repoToken);
                            switch (o.context.payload.label.name) {
                                case e.templateNotUsedLabel:
                                    await t.issues.createComment({
                                        ...o.context.issue,
                                        body: await interpolateValues(
                                            e.templateNotUsedCommentBody
                                        ),
                                    });
                                    break;
                                case e.doesntFollowTemplateCommentBody:
                                    await t.issues.createComment({
                                        ...o.context.issue,
                                        body: await interpolateValues(
                                            e.doesntFollowTemplateCommentBody
                                        ),
                                    });
                            }
                            break;
                        }
                        case "close": {
                            await new n(e).process();
                        }
                    }
                } catch (e) {
                    s.error(e);
                    s.setFailed(e.message);
                }
            }
            run();
        },
        87: (e, t, r) => {
            "use strict";
            Object.defineProperty(t, "__esModule", { value: true });
            t.Context = void 0;
            const s = r(747);
            const o = r(365);
            class Context {
                constructor() {
                    this.payload = {};
                    if (process.env.GITHUB_EVENT_PATH) {
                        if (s.existsSync(process.env.GITHUB_EVENT_PATH)) {
                            this.payload = JSON.parse(
                                s.readFileSync(process.env.GITHUB_EVENT_PATH, {
                                    encoding: "utf8",
                                })
                            );
                        } else {
                            const e = process.env.GITHUB_EVENT_PATH;
                            process.stdout.write(
                                `GITHUB_EVENT_PATH ${e} does not exist${o.EOL}`
                            );
                        }
                    }
                    this.eventName = process.env.GITHUB_EVENT_NAME;
                    this.sha = process.env.GITHUB_SHA;
                    this.ref = process.env.GITHUB_REF;
                    this.workflow = process.env.GITHUB_WORKFLOW;
                    this.action = process.env.GITHUB_ACTION;
                    this.actor = process.env.GITHUB_ACTOR;
                    this.job = process.env.GITHUB_JOB;
                    this.runNumber = parseInt(
                        process.env.GITHUB_RUN_NUMBER,
                        10
                    );
                    this.runId = parseInt(process.env.GITHUB_RUN_ID, 10);
                }
                get issue() {
                    const e = this.payload;
                    return Object.assign(Object.assign({}, this.repo), {
                        number: (e.issue || e.pull_request || e).number,
                    });
                }
                get repo() {
                    if (process.env.GITHUB_REPOSITORY) {
                        const [e, t] = process.env.GITHUB_REPOSITORY.split("/");
                        return { owner: e, repo: t };
                    }
                    if (this.payload.repository) {
                        return {
                            owner: this.payload.repository.owner.login,
                            repo: this.payload.repository.name,
                        };
                    }
                    throw new Error(
                        "context.repo requires a GITHUB_REPOSITORY environment variable like 'owner/repo'"
                    );
                }
            }
            t.Context = Context;
        },
        438: function (e, t, r) {
            "use strict";
            var s =
                (this && this.__createBinding) ||
                (Object.create
                    ? function (e, t, r, s) {
                          if (s === undefined) s = r;
                          Object.defineProperty(e, s, {
                              enumerable: true,
                              get: function () {
                                  return t[r];
                              },
                          });
                      }
                    : function (e, t, r, s) {
                          if (s === undefined) s = r;
                          e[s] = t[r];
                      });
            var o =
                (this && this.__setModuleDefault) ||
                (Object.create
                    ? function (e, t) {
                          Object.defineProperty(e, "default", {
                              enumerable: true,
                              value: t,
                          });
                      }
                    : function (e, t) {
                          e["default"] = t;
                      });
            var n =
                (this && this.__importStar) ||
                function (e) {
                    if (e && e.__esModule) return e;
                    var t = {};
                    if (e != null)
                        for (var r in e)
                            if (Object.hasOwnProperty.call(e, r)) s(t, e, r);
                    o(t, e);
                    return t;
                };
            Object.defineProperty(t, "__esModule", { value: true });
            t.getOctokit = t.context = void 0;
            const i = n(r(87));
            const c = r(30);
            t.context = new i.Context();
            function getOctokit(e, t) {
                return new c.GitHub(c.getOctokitOptions(e, t));
            }
            t.getOctokit = getOctokit;
        },
        914: function (e, t, r) {
            "use strict";
            var s =
                (this && this.__createBinding) ||
                (Object.create
                    ? function (e, t, r, s) {
                          if (s === undefined) s = r;
                          Object.defineProperty(e, s, {
                              enumerable: true,
                              get: function () {
                                  return t[r];
                              },
                          });
                      }
                    : function (e, t, r, s) {
                          if (s === undefined) s = r;
                          e[s] = t[r];
                      });
            var o =
                (this && this.__setModuleDefault) ||
                (Object.create
                    ? function (e, t) {
                          Object.defineProperty(e, "default", {
                              enumerable: true,
                              value: t,
                          });
                      }
                    : function (e, t) {
                          e["default"] = t;
                      });
            var n =
                (this && this.__importStar) ||
                function (e) {
                    if (e && e.__esModule) return e;
                    var t = {};
                    if (e != null)
                        for (var r in e)
                            if (Object.hasOwnProperty.call(e, r)) s(t, e, r);
                    o(t, e);
                    return t;
                };
            Object.defineProperty(t, "__esModule", { value: true });
            t.getApiBaseUrl = t.getProxyAgent = t.getAuthString = void 0;
            const i = n(r(925));
            function getAuthString(e, t) {
                if (!e && !t.auth) {
                    throw new Error("Parameter token or opts.auth is required");
                } else if (e && t.auth) {
                    throw new Error(
                        "Parameters token and opts.auth may not both be specified"
                    );
                }
                return typeof t.auth === "string" ? t.auth : `token ${e}`;
            }
            t.getAuthString = getAuthString;
            function getProxyAgent(e) {
                const t = new i.HttpClient();
                return t.getAgent(e);
            }
            t.getProxyAgent = getProxyAgent;
            function getApiBaseUrl() {
                return (
                    process.env["GITHUB_API_URL"] || "https://api.github.com"
                );
            }
            t.getApiBaseUrl = getApiBaseUrl;
        },
        30: function (e, t, r) {
            "use strict";
            var s =
                (this && this.__createBinding) ||
                (Object.create
                    ? function (e, t, r, s) {
                          if (s === undefined) s = r;
                          Object.defineProperty(e, s, {
                              enumerable: true,
                              get: function () {
                                  return t[r];
                              },
                          });
                      }
                    : function (e, t, r, s) {
                          if (s === undefined) s = r;
                          e[s] = t[r];
                      });
            var o =
                (this && this.__setModuleDefault) ||
                (Object.create
                    ? function (e, t) {
                          Object.defineProperty(e, "default", {
                              enumerable: true,
                              value: t,
                          });
                      }
                    : function (e, t) {
                          e["default"] = t;
                      });
            var n =
                (this && this.__importStar) ||
                function (e) {
                    if (e && e.__esModule) return e;
                    var t = {};
                    if (e != null)
                        for (var r in e)
                            if (Object.hasOwnProperty.call(e, r)) s(t, e, r);
                    o(t, e);
                    return t;
                };
            Object.defineProperty(t, "__esModule", { value: true });
            t.getOctokitOptions = t.GitHub = t.context = void 0;
            const i = n(r(87));
            const c = n(r(914));
            const a = r(762);
            const u = r(44);
            const l = r(193);
            t.context = new i.Context();
            const p = c.getApiBaseUrl();
            const d = { baseUrl: p, request: { agent: c.getProxyAgent(p) } };
            t.GitHub = a.Octokit.plugin(
                u.restEndpointMethods,
                l.paginateRest
            ).defaults(d);
            function getOctokitOptions(e, t) {
                const r = Object.assign({}, t || {});
                const s = c.getAuthString(e, r);
                if (s) {
                    r.auth = s;
                }
                return r;
            }
            t.getOctokitOptions = getOctokitOptions;
        },
        925: (e, t, r) => {
            "use strict";
            Object.defineProperty(t, "__esModule", { value: true });
            const s = r(605);
            const o = r(211);
            const n = r(443);
            let i;
            var c;
            (function (e) {
                e[(e["OK"] = 200)] = "OK";
                e[(e["MultipleChoices"] = 300)] = "MultipleChoices";
                e[(e["MovedPermanently"] = 301)] = "MovedPermanently";
                e[(e["ResourceMoved"] = 302)] = "ResourceMoved";
                e[(e["SeeOther"] = 303)] = "SeeOther";
                e[(e["NotModified"] = 304)] = "NotModified";
                e[(e["UseProxy"] = 305)] = "UseProxy";
                e[(e["SwitchProxy"] = 306)] = "SwitchProxy";
                e[(e["TemporaryRedirect"] = 307)] = "TemporaryRedirect";
                e[(e["PermanentRedirect"] = 308)] = "PermanentRedirect";
                e[(e["BadRequest"] = 400)] = "BadRequest";
                e[(e["Unauthorized"] = 401)] = "Unauthorized";
                e[(e["PaymentRequired"] = 402)] = "PaymentRequired";
                e[(e["Forbidden"] = 403)] = "Forbidden";
                e[(e["NotFound"] = 404)] = "NotFound";
                e[(e["MethodNotAllowed"] = 405)] = "MethodNotAllowed";
                e[(e["NotAcceptable"] = 406)] = "NotAcceptable";
                e[(e["ProxyAuthenticationRequired"] = 407)] =
                    "ProxyAuthenticationRequired";
                e[(e["RequestTimeout"] = 408)] = "RequestTimeout";
                e[(e["Conflict"] = 409)] = "Conflict";
                e[(e["Gone"] = 410)] = "Gone";
                e[(e["TooManyRequests"] = 429)] = "TooManyRequests";
                e[(e["InternalServerError"] = 500)] = "InternalServerError";
                e[(e["NotImplemented"] = 501)] = "NotImplemented";
                e[(e["BadGateway"] = 502)] = "BadGateway";
                e[(e["ServiceUnavailable"] = 503)] = "ServiceUnavailable";
                e[(e["GatewayTimeout"] = 504)] = "GatewayTimeout";
            })((c = t.HttpCodes || (t.HttpCodes = {})));
            var a;
            (function (e) {
                e["Accept"] = "accept";
                e["ContentType"] = "content-type";
            })((a = t.Headers || (t.Headers = {})));
            var u;
            (function (e) {
                e["ApplicationJson"] = "application/json";
            })((u = t.MediaTypes || (t.MediaTypes = {})));
            function getProxyUrl(e) {
                let t = n.getProxyUrl(new URL(e));
                return t ? t.href : "";
            }
            t.getProxyUrl = getProxyUrl;
            const l = [
                c.MovedPermanently,
                c.ResourceMoved,
                c.SeeOther,
                c.TemporaryRedirect,
                c.PermanentRedirect,
            ];
            const p = [c.BadGateway, c.ServiceUnavailable, c.GatewayTimeout];
            const d = ["OPTIONS", "GET", "DELETE", "HEAD"];
            const m = 10;
            const g = 5;
            class HttpClientError extends Error {
                constructor(e, t) {
                    super(e);
                    this.name = "HttpClientError";
                    this.statusCode = t;
                    Object.setPrototypeOf(this, HttpClientError.prototype);
                }
            }
            t.HttpClientError = HttpClientError;
            class HttpClientResponse {
                constructor(e) {
                    this.message = e;
                }
                readBody() {
                    return new Promise(async (e, t) => {
                        let r = Buffer.alloc(0);
                        this.message.on("data", (e) => {
                            r = Buffer.concat([r, e]);
                        });
                        this.message.on("end", () => {
                            e(r.toString());
                        });
                    });
                }
            }
            t.HttpClientResponse = HttpClientResponse;
            function isHttps(e) {
                let t = new URL(e);
                return t.protocol === "https:";
            }
            t.isHttps = isHttps;
            class HttpClient {
                constructor(e, t, r) {
                    this._ignoreSslError = false;
                    this._allowRedirects = true;
                    this._allowRedirectDowngrade = false;
                    this._maxRedirects = 50;
                    this._allowRetries = false;
                    this._maxRetries = 1;
                    this._keepAlive = false;
                    this._disposed = false;
                    this.userAgent = e;
                    this.handlers = t || [];
                    this.requestOptions = r;
                    if (r) {
                        if (r.ignoreSslError != null) {
                            this._ignoreSslError = r.ignoreSslError;
                        }
                        this._socketTimeout = r.socketTimeout;
                        if (r.allowRedirects != null) {
                            this._allowRedirects = r.allowRedirects;
                        }
                        if (r.allowRedirectDowngrade != null) {
                            this._allowRedirectDowngrade =
                                r.allowRedirectDowngrade;
                        }
                        if (r.maxRedirects != null) {
                            this._maxRedirects = Math.max(r.maxRedirects, 0);
                        }
                        if (r.keepAlive != null) {
                            this._keepAlive = r.keepAlive;
                        }
                        if (r.allowRetries != null) {
                            this._allowRetries = r.allowRetries;
                        }
                        if (r.maxRetries != null) {
                            this._maxRetries = r.maxRetries;
                        }
                    }
                }
                options(e, t) {
                    return this.request("OPTIONS", e, null, t || {});
                }
                get(e, t) {
                    return this.request("GET", e, null, t || {});
                }
                del(e, t) {
                    return this.request("DELETE", e, null, t || {});
                }
                post(e, t, r) {
                    return this.request("POST", e, t, r || {});
                }
                patch(e, t, r) {
                    return this.request("PATCH", e, t, r || {});
                }
                put(e, t, r) {
                    return this.request("PUT", e, t, r || {});
                }
                head(e, t) {
                    return this.request("HEAD", e, null, t || {});
                }
                sendStream(e, t, r, s) {
                    return this.request(e, t, r, s);
                }
                async getJson(e, t = {}) {
                    t[a.Accept] = this._getExistingOrDefaultHeader(
                        t,
                        a.Accept,
                        u.ApplicationJson
                    );
                    let r = await this.get(e, t);
                    return this._processResponse(r, this.requestOptions);
                }
                async postJson(e, t, r = {}) {
                    let s = JSON.stringify(t, null, 2);
                    r[a.Accept] = this._getExistingOrDefaultHeader(
                        r,
                        a.Accept,
                        u.ApplicationJson
                    );
                    r[a.ContentType] = this._getExistingOrDefaultHeader(
                        r,
                        a.ContentType,
                        u.ApplicationJson
                    );
                    let o = await this.post(e, s, r);
                    return this._processResponse(o, this.requestOptions);
                }
                async putJson(e, t, r = {}) {
                    let s = JSON.stringify(t, null, 2);
                    r[a.Accept] = this._getExistingOrDefaultHeader(
                        r,
                        a.Accept,
                        u.ApplicationJson
                    );
                    r[a.ContentType] = this._getExistingOrDefaultHeader(
                        r,
                        a.ContentType,
                        u.ApplicationJson
                    );
                    let o = await this.put(e, s, r);
                    return this._processResponse(o, this.requestOptions);
                }
                async patchJson(e, t, r = {}) {
                    let s = JSON.stringify(t, null, 2);
                    r[a.Accept] = this._getExistingOrDefaultHeader(
                        r,
                        a.Accept,
                        u.ApplicationJson
                    );
                    r[a.ContentType] = this._getExistingOrDefaultHeader(
                        r,
                        a.ContentType,
                        u.ApplicationJson
                    );
                    let o = await this.patch(e, s, r);
                    return this._processResponse(o, this.requestOptions);
                }
                async request(e, t, r, s) {
                    if (this._disposed) {
                        throw new Error("Client has already been disposed.");
                    }
                    let o = new URL(t);
                    let n = this._prepareRequest(e, o, s);
                    let i =
                        this._allowRetries && d.indexOf(e) != -1
                            ? this._maxRetries + 1
                            : 1;
                    let a = 0;
                    let u;
                    while (a < i) {
                        u = await this.requestRaw(n, r);
                        if (
                            u &&
                            u.message &&
                            u.message.statusCode === c.Unauthorized
                        ) {
                            let e;
                            for (let t = 0; t < this.handlers.length; t++) {
                                if (
                                    this.handlers[t].canHandleAuthentication(u)
                                ) {
                                    e = this.handlers[t];
                                    break;
                                }
                            }
                            if (e) {
                                return e.handleAuthentication(this, n, r);
                            } else {
                                return u;
                            }
                        }
                        let t = this._maxRedirects;
                        while (
                            l.indexOf(u.message.statusCode) != -1 &&
                            this._allowRedirects &&
                            t > 0
                        ) {
                            const i = u.message.headers["location"];
                            if (!i) {
                                break;
                            }
                            let c = new URL(i);
                            if (
                                o.protocol == "https:" &&
                                o.protocol != c.protocol &&
                                !this._allowRedirectDowngrade
                            ) {
                                throw new Error(
                                    "Redirect from HTTPS to HTTP protocol. This downgrade is not allowed for security reasons. If you want to allow this behavior, set the allowRedirectDowngrade option to true."
                                );
                            }
                            await u.readBody();
                            if (c.hostname !== o.hostname) {
                                for (let e in s) {
                                    if (e.toLowerCase() === "authorization") {
                                        delete s[e];
                                    }
                                }
                            }
                            n = this._prepareRequest(e, c, s);
                            u = await this.requestRaw(n, r);
                            t--;
                        }
                        if (p.indexOf(u.message.statusCode) == -1) {
                            return u;
                        }
                        a += 1;
                        if (a < i) {
                            await u.readBody();
                            await this._performExponentialBackoff(a);
                        }
                    }
                    return u;
                }
                dispose() {
                    if (this._agent) {
                        this._agent.destroy();
                    }
                    this._disposed = true;
                }
                requestRaw(e, t) {
                    return new Promise((r, s) => {
                        let o = function (e, t) {
                            if (e) {
                                s(e);
                            }
                            r(t);
                        };
                        this.requestRawWithCallback(e, t, o);
                    });
                }
                requestRawWithCallback(e, t, r) {
                    let s;
                    if (typeof t === "string") {
                        e.options.headers["Content-Length"] = Buffer.byteLength(
                            t,
                            "utf8"
                        );
                    }
                    let o = false;
                    let n = (e, t) => {
                        if (!o) {
                            o = true;
                            r(e, t);
                        }
                    };
                    let i = e.httpModule.request(e.options, (e) => {
                        let t = new HttpClientResponse(e);
                        n(null, t);
                    });
                    i.on("socket", (e) => {
                        s = e;
                    });
                    i.setTimeout(this._socketTimeout || 3 * 6e4, () => {
                        if (s) {
                            s.end();
                        }
                        n(
                            new Error("Request timeout: " + e.options.path),
                            null
                        );
                    });
                    i.on("error", function (e) {
                        n(e, null);
                    });
                    if (t && typeof t === "string") {
                        i.write(t, "utf8");
                    }
                    if (t && typeof t !== "string") {
                        t.on("close", function () {
                            i.end();
                        });
                        t.pipe(i);
                    } else {
                        i.end();
                    }
                }
                getAgent(e) {
                    let t = new URL(e);
                    return this._getAgent(t);
                }
                _prepareRequest(e, t, r) {
                    const n = {};
                    n.parsedUrl = t;
                    const i = n.parsedUrl.protocol === "https:";
                    n.httpModule = i ? o : s;
                    const c = i ? 443 : 80;
                    n.options = {};
                    n.options.host = n.parsedUrl.hostname;
                    n.options.port = n.parsedUrl.port
                        ? parseInt(n.parsedUrl.port)
                        : c;
                    n.options.path =
                        (n.parsedUrl.pathname || "") +
                        (n.parsedUrl.search || "");
                    n.options.method = e;
                    n.options.headers = this._mergeHeaders(r);
                    if (this.userAgent != null) {
                        n.options.headers["user-agent"] = this.userAgent;
                    }
                    n.options.agent = this._getAgent(n.parsedUrl);
                    if (this.handlers) {
                        this.handlers.forEach((e) => {
                            e.prepareRequest(n.options);
                        });
                    }
                    return n;
                }
                _mergeHeaders(e) {
                    const t = (e) =>
                        Object.keys(e).reduce(
                            (t, r) => ((t[r.toLowerCase()] = e[r]), t),
                            {}
                        );
                    if (this.requestOptions && this.requestOptions.headers) {
                        return Object.assign(
                            {},
                            t(this.requestOptions.headers),
                            t(e)
                        );
                    }
                    return t(e || {});
                }
                _getExistingOrDefaultHeader(e, t, r) {
                    const s = (e) =>
                        Object.keys(e).reduce(
                            (t, r) => ((t[r.toLowerCase()] = e[r]), t),
                            {}
                        );
                    let o;
                    if (this.requestOptions && this.requestOptions.headers) {
                        o = s(this.requestOptions.headers)[t];
                    }
                    return e[t] || o || r;
                }
                _getAgent(e) {
                    let t;
                    let c = n.getProxyUrl(e);
                    let a = c && c.hostname;
                    if (this._keepAlive && a) {
                        t = this._proxyAgent;
                    }
                    if (this._keepAlive && !a) {
                        t = this._agent;
                    }
                    if (!!t) {
                        return t;
                    }
                    const u = e.protocol === "https:";
                    let l = 100;
                    if (!!this.requestOptions) {
                        l =
                            this.requestOptions.maxSockets ||
                            s.globalAgent.maxSockets;
                    }
                    if (a) {
                        if (!i) {
                            i = r(294);
                        }
                        const e = {
                            maxSockets: l,
                            keepAlive: this._keepAlive,
                            proxy: {
                                proxyAuth: `${c.username}:${c.password}`,
                                host: c.hostname,
                                port: c.port,
                            },
                        };
                        let s;
                        const o = c.protocol === "https:";
                        if (u) {
                            s = o ? i.httpsOverHttps : i.httpsOverHttp;
                        } else {
                            s = o ? i.httpOverHttps : i.httpOverHttp;
                        }
                        t = s(e);
                        this._proxyAgent = t;
                    }
                    if (this._keepAlive && !t) {
                        const e = { keepAlive: this._keepAlive, maxSockets: l };
                        t = u ? new o.Agent(e) : new s.Agent(e);
                        this._agent = t;
                    }
                    if (!t) {
                        t = u ? o.globalAgent : s.globalAgent;
                    }
                    if (u && this._ignoreSslError) {
                        t.options = Object.assign(t.options || {}, {
                            rejectUnauthorized: false,
                        });
                    }
                    return t;
                }
                _performExponentialBackoff(e) {
                    e = Math.min(m, e);
                    const t = g * Math.pow(2, e);
                    return new Promise((e) => setTimeout(() => e(), t));
                }
                static dateTimeDeserializer(e, t) {
                    if (typeof t === "string") {
                        let e = new Date(t);
                        if (!isNaN(e.valueOf())) {
                            return e;
                        }
                    }
                    return t;
                }
                async _processResponse(e, t) {
                    return new Promise(async (r, s) => {
                        const o = e.message.statusCode;
                        const n = { statusCode: o, result: null, headers: {} };
                        if (o == c.NotFound) {
                            r(n);
                        }
                        let i;
                        let a;
                        try {
                            a = await e.readBody();
                            if (a && a.length > 0) {
                                if (t && t.deserializeDates) {
                                    i = JSON.parse(
                                        a,
                                        HttpClient.dateTimeDeserializer
                                    );
                                } else {
                                    i = JSON.parse(a);
                                }
                                n.result = i;
                            }
                            n.headers = e.message.headers;
                        } catch (e) {}
                        if (o > 299) {
                            let e;
                            if (i && i.message) {
                                e = i.message;
                            } else if (a && a.length > 0) {
                                e = a;
                            } else {
                                e = "Failed request: (" + o + ")";
                            }
                            let t = new HttpClientError(e, o);
                            t.result = n.result;
                            s(t);
                        } else {
                            r(n);
                        }
                    });
                }
            }
            t.HttpClient = HttpClient;
        },
        443: (e, t) => {
            "use strict";
            Object.defineProperty(t, "__esModule", { value: true });
            function getProxyUrl(e) {
                let t = e.protocol === "https:";
                let r;
                if (checkBypass(e)) {
                    return r;
                }
                let s;
                if (t) {
                    s =
                        process.env["https_proxy"] ||
                        process.env["HTTPS_PROXY"];
                } else {
                    s = process.env["http_proxy"] || process.env["HTTP_PROXY"];
                }
                if (s) {
                    r = new URL(s);
                }
                return r;
            }
            t.getProxyUrl = getProxyUrl;
            function checkBypass(e) {
                if (!e.hostname) {
                    return false;
                }
                let t =
                    process.env["no_proxy"] || process.env["NO_PROXY"] || "";
                if (!t) {
                    return false;
                }
                let r;
                if (e.port) {
                    r = Number(e.port);
                } else if (e.protocol === "http:") {
                    r = 80;
                } else if (e.protocol === "https:") {
                    r = 443;
                }
                let s = [e.hostname.toUpperCase()];
                if (typeof r === "number") {
                    s.push(`${s[0]}:${r}`);
                }
                for (let e of t
                    .split(",")
                    .map((e) => e.trim().toUpperCase())
                    .filter((e) => e)) {
                    if (s.some((t) => t === e)) {
                        return true;
                    }
                }
                return false;
            }
            t.checkBypass = checkBypass;
        },
        334: (e, t) => {
            "use strict";
            Object.defineProperty(t, "__esModule", { value: true });
            async function auth(e) {
                const t =
                    e.split(/\./).length === 3
                        ? "app"
                        : /^v\d+\./.test(e)
                        ? "installation"
                        : "oauth";
                return { type: "token", token: e, tokenType: t };
            }
            function withAuthorizationPrefix(e) {
                if (e.split(/\./).length === 3) {
                    return `bearer ${e}`;
                }
                return `token ${e}`;
            }
            async function hook(e, t, r, s) {
                const o = t.endpoint.merge(r, s);
                o.headers.authorization = withAuthorizationPrefix(e);
                return t(o);
            }
            const r = function createTokenAuth(e) {
                if (!e) {
                    throw new Error(
                        "[@octokit/auth-token] No token passed to createTokenAuth"
                    );
                }
                if (typeof e !== "string") {
                    throw new Error(
                        "[@octokit/auth-token] Token passed to createTokenAuth is not a string"
                    );
                }
                e = e.replace(/^(token|bearer) +/i, "");
                return Object.assign(auth.bind(null, e), {
                    hook: hook.bind(null, e),
                });
            };
            t.createTokenAuth = r;
        },
        762: (e, t, r) => {
            "use strict";
            Object.defineProperty(t, "__esModule", { value: true });
            var s = r(429);
            var o = r(682);
            var n = r(234);
            var i = r(668);
            var c = r(334);
            function _objectWithoutPropertiesLoose(e, t) {
                if (e == null) return {};
                var r = {};
                var s = Object.keys(e);
                var o, n;
                for (n = 0; n < s.length; n++) {
                    o = s[n];
                    if (t.indexOf(o) >= 0) continue;
                    r[o] = e[o];
                }
                return r;
            }
            function _objectWithoutProperties(e, t) {
                if (e == null) return {};
                var r = _objectWithoutPropertiesLoose(e, t);
                var s, o;
                if (Object.getOwnPropertySymbols) {
                    var n = Object.getOwnPropertySymbols(e);
                    for (o = 0; o < n.length; o++) {
                        s = n[o];
                        if (t.indexOf(s) >= 0) continue;
                        if (!Object.prototype.propertyIsEnumerable.call(e, s))
                            continue;
                        r[s] = e[s];
                    }
                }
                return r;
            }
            const a = "3.2.4";
            class Octokit {
                constructor(e = {}) {
                    const t = new o.Collection();
                    const r = {
                        baseUrl: n.request.endpoint.DEFAULTS.baseUrl,
                        headers: {},
                        request: Object.assign({}, e.request, {
                            hook: t.bind(null, "request"),
                        }),
                        mediaType: { previews: [], format: "" },
                    };
                    r.headers["user-agent"] = [
                        e.userAgent,
                        `octokit-core.js/${a} ${s.getUserAgent()}`,
                    ]
                        .filter(Boolean)
                        .join(" ");
                    if (e.baseUrl) {
                        r.baseUrl = e.baseUrl;
                    }
                    if (e.previews) {
                        r.mediaType.previews = e.previews;
                    }
                    if (e.timeZone) {
                        r.headers["time-zone"] = e.timeZone;
                    }
                    this.request = n.request.defaults(r);
                    this.graphql = i
                        .withCustomRequest(this.request)
                        .defaults(r);
                    this.log = Object.assign(
                        {
                            debug: () => {},
                            info: () => {},
                            warn: console.warn.bind(console),
                            error: console.error.bind(console),
                        },
                        e.log
                    );
                    this.hook = t;
                    if (!e.authStrategy) {
                        if (!e.auth) {
                            this.auth = async () => ({
                                type: "unauthenticated",
                            });
                        } else {
                            const r = c.createTokenAuth(e.auth);
                            t.wrap("request", r.hook);
                            this.auth = r;
                        }
                    } else {
                        const { authStrategy: r } = e,
                            s = _objectWithoutProperties(e, ["authStrategy"]);
                        const o = r(
                            Object.assign(
                                {
                                    request: this.request,
                                    log: this.log,
                                    octokit: this,
                                    octokitOptions: s,
                                },
                                e.auth
                            )
                        );
                        t.wrap("request", o.hook);
                        this.auth = o;
                    }
                    const u = this.constructor;
                    u.plugins.forEach((t) => {
                        Object.assign(this, t(this, e));
                    });
                }
                static defaults(e) {
                    const t = class extends this {
                        constructor(...t) {
                            const r = t[0] || {};
                            if (typeof e === "function") {
                                super(e(r));
                                return;
                            }
                            super(
                                Object.assign(
                                    {},
                                    e,
                                    r,
                                    r.userAgent && e.userAgent
                                        ? {
                                              userAgent: `${r.userAgent} ${e.userAgent}`,
                                          }
                                        : null
                                )
                            );
                        }
                    };
                    return t;
                }
                static plugin(...e) {
                    var t;
                    const r = this.plugins;
                    const s =
                        ((t = class extends this {}),
                        (t.plugins = r.concat(e.filter((e) => !r.includes(e)))),
                        t);
                    return s;
                }
            }
            Octokit.VERSION = a;
            Octokit.plugins = [];
            t.Octokit = Octokit;
        },
        440: (e, t, r) => {
            "use strict";
            Object.defineProperty(t, "__esModule", { value: true });
            var s = r(287);
            var o = r(429);
            function lowercaseKeys(e) {
                if (!e) {
                    return {};
                }
                return Object.keys(e).reduce((t, r) => {
                    t[r.toLowerCase()] = e[r];
                    return t;
                }, {});
            }
            function mergeDeep(e, t) {
                const r = Object.assign({}, e);
                Object.keys(t).forEach((o) => {
                    if (s.isPlainObject(t[o])) {
                        if (!(o in e)) Object.assign(r, { [o]: t[o] });
                        else r[o] = mergeDeep(e[o], t[o]);
                    } else {
                        Object.assign(r, { [o]: t[o] });
                    }
                });
                return r;
            }
            function removeUndefinedProperties(e) {
                for (const t in e) {
                    if (e[t] === undefined) {
                        delete e[t];
                    }
                }
                return e;
            }
            function merge(e, t, r) {
                if (typeof t === "string") {
                    let [e, s] = t.split(" ");
                    r = Object.assign(
                        s ? { method: e, url: s } : { url: e },
                        r
                    );
                } else {
                    r = Object.assign({}, t);
                }
                r.headers = lowercaseKeys(r.headers);
                removeUndefinedProperties(r);
                removeUndefinedProperties(r.headers);
                const s = mergeDeep(e || {}, r);
                if (e && e.mediaType.previews.length) {
                    s.mediaType.previews = e.mediaType.previews
                        .filter((e) => !s.mediaType.previews.includes(e))
                        .concat(s.mediaType.previews);
                }
                s.mediaType.previews = s.mediaType.previews.map((e) =>
                    e.replace(/-preview/, "")
                );
                return s;
            }
            function addQueryParameters(e, t) {
                const r = /\?/.test(e) ? "&" : "?";
                const s = Object.keys(t);
                if (s.length === 0) {
                    return e;
                }
                return (
                    e +
                    r +
                    s
                        .map((e) => {
                            if (e === "q") {
                                return (
                                    "q=" +
                                    t.q
                                        .split("+")
                                        .map(encodeURIComponent)
                                        .join("+")
                                );
                            }
                            return `${e}=${encodeURIComponent(t[e])}`;
                        })
                        .join("&")
                );
            }
            const n = /\{[^}]+\}/g;
            function removeNonChars(e) {
                return e.replace(/^\W+|\W+$/g, "").split(/,/);
            }
            function extractUrlVariableNames(e) {
                const t = e.match(n);
                if (!t) {
                    return [];
                }
                return t.map(removeNonChars).reduce((e, t) => e.concat(t), []);
            }
            function omit(e, t) {
                return Object.keys(e)
                    .filter((e) => !t.includes(e))
                    .reduce((t, r) => {
                        t[r] = e[r];
                        return t;
                    }, {});
            }
            function encodeReserved(e) {
                return e
                    .split(/(%[0-9A-Fa-f]{2})/g)
                    .map(function (e) {
                        if (!/%[0-9A-Fa-f]/.test(e)) {
                            e = encodeURI(e)
                                .replace(/%5B/g, "[")
                                .replace(/%5D/g, "]");
                        }
                        return e;
                    })
                    .join("");
            }
            function encodeUnreserved(e) {
                return encodeURIComponent(e).replace(/[!'()*]/g, function (e) {
                    return "%" + e.charCodeAt(0).toString(16).toUpperCase();
                });
            }
            function encodeValue(e, t, r) {
                t =
                    e === "+" || e === "#"
                        ? encodeReserved(t)
                        : encodeUnreserved(t);
                if (r) {
                    return encodeUnreserved(r) + "=" + t;
                } else {
                    return t;
                }
            }
            function isDefined(e) {
                return e !== undefined && e !== null;
            }
            function isKeyOperator(e) {
                return e === ";" || e === "&" || e === "?";
            }
            function getValues(e, t, r, s) {
                var o = e[r],
                    n = [];
                if (isDefined(o) && o !== "") {
                    if (
                        typeof o === "string" ||
                        typeof o === "number" ||
                        typeof o === "boolean"
                    ) {
                        o = o.toString();
                        if (s && s !== "*") {
                            o = o.substring(0, parseInt(s, 10));
                        }
                        n.push(encodeValue(t, o, isKeyOperator(t) ? r : ""));
                    } else {
                        if (s === "*") {
                            if (Array.isArray(o)) {
                                o.filter(isDefined).forEach(function (e) {
                                    n.push(
                                        encodeValue(
                                            t,
                                            e,
                                            isKeyOperator(t) ? r : ""
                                        )
                                    );
                                });
                            } else {
                                Object.keys(o).forEach(function (e) {
                                    if (isDefined(o[e])) {
                                        n.push(encodeValue(t, o[e], e));
                                    }
                                });
                            }
                        } else {
                            const e = [];
                            if (Array.isArray(o)) {
                                o.filter(isDefined).forEach(function (r) {
                                    e.push(encodeValue(t, r));
                                });
                            } else {
                                Object.keys(o).forEach(function (r) {
                                    if (isDefined(o[r])) {
                                        e.push(encodeUnreserved(r));
                                        e.push(encodeValue(t, o[r].toString()));
                                    }
                                });
                            }
                            if (isKeyOperator(t)) {
                                n.push(encodeUnreserved(r) + "=" + e.join(","));
                            } else if (e.length !== 0) {
                                n.push(e.join(","));
                            }
                        }
                    }
                } else {
                    if (t === ";") {
                        if (isDefined(o)) {
                            n.push(encodeUnreserved(r));
                        }
                    } else if (o === "" && (t === "&" || t === "?")) {
                        n.push(encodeUnreserved(r) + "=");
                    } else if (o === "") {
                        n.push("");
                    }
                }
                return n;
            }
            function parseUrl(e) {
                return { expand: expand.bind(null, e) };
            }
            function expand(e, t) {
                var r = ["+", "#", ".", "/", ";", "?", "&"];
                return e.replace(/\{([^\{\}]+)\}|([^\{\}]+)/g, function (
                    e,
                    s,
                    o
                ) {
                    if (s) {
                        let e = "";
                        const o = [];
                        if (r.indexOf(s.charAt(0)) !== -1) {
                            e = s.charAt(0);
                            s = s.substr(1);
                        }
                        s.split(/,/g).forEach(function (r) {
                            var s = /([^:\*]*)(?::(\d+)|(\*))?/.exec(r);
                            o.push(getValues(t, e, s[1], s[2] || s[3]));
                        });
                        if (e && e !== "+") {
                            var n = ",";
                            if (e === "?") {
                                n = "&";
                            } else if (e !== "#") {
                                n = e;
                            }
                            return (o.length !== 0 ? e : "") + o.join(n);
                        } else {
                            return o.join(",");
                        }
                    } else {
                        return encodeReserved(o);
                    }
                });
            }
            function parse(e) {
                let t = e.method.toUpperCase();
                let r = (e.url || "/").replace(/:([a-z]\w+)/g, "{$1}");
                let s = Object.assign({}, e.headers);
                let o;
                let n = omit(e, [
                    "method",
                    "baseUrl",
                    "url",
                    "headers",
                    "request",
                    "mediaType",
                ]);
                const i = extractUrlVariableNames(r);
                r = parseUrl(r).expand(n);
                if (!/^http/.test(r)) {
                    r = e.baseUrl + r;
                }
                const c = Object.keys(e)
                    .filter((e) => i.includes(e))
                    .concat("baseUrl");
                const a = omit(n, c);
                const u = /application\/octet-stream/i.test(s.accept);
                if (!u) {
                    if (e.mediaType.format) {
                        s.accept = s.accept
                            .split(/,/)
                            .map((t) =>
                                t.replace(
                                    /application\/vnd(\.\w+)(\.v3)?(\.\w+)?(\+json)?$/,
                                    `application/vnd$1$2.${e.mediaType.format}`
                                )
                            )
                            .join(",");
                    }
                    if (e.mediaType.previews.length) {
                        const t = s.accept.match(/[\w-]+(?=-preview)/g) || [];
                        s.accept = t
                            .concat(e.mediaType.previews)
                            .map((t) => {
                                const r = e.mediaType.format
                                    ? `.${e.mediaType.format}`
                                    : "+json";
                                return `application/vnd.github.${t}-preview${r}`;
                            })
                            .join(",");
                    }
                }
                if (["GET", "HEAD"].includes(t)) {
                    r = addQueryParameters(r, a);
                } else {
                    if ("data" in a) {
                        o = a.data;
                    } else {
                        if (Object.keys(a).length) {
                            o = a;
                        } else {
                            s["content-length"] = 0;
                        }
                    }
                }
                if (!s["content-type"] && typeof o !== "undefined") {
                    s["content-type"] = "application/json; charset=utf-8";
                }
                if (["PATCH", "PUT"].includes(t) && typeof o === "undefined") {
                    o = "";
                }
                return Object.assign(
                    { method: t, url: r, headers: s },
                    typeof o !== "undefined" ? { body: o } : null,
                    e.request ? { request: e.request } : null
                );
            }
            function endpointWithDefaults(e, t, r) {
                return parse(merge(e, t, r));
            }
            function withDefaults(e, t) {
                const r = merge(e, t);
                const s = endpointWithDefaults.bind(null, r);
                return Object.assign(s, {
                    DEFAULTS: r,
                    defaults: withDefaults.bind(null, r),
                    merge: merge.bind(null, r),
                    parse: parse,
                });
            }
            const i = "6.0.10";
            const c = `octokit-endpoint.js/${i} ${o.getUserAgent()}`;
            const a = {
                method: "GET",
                baseUrl: "https://api.github.com",
                headers: {
                    accept: "application/vnd.github.v3+json",
                    "user-agent": c,
                },
                mediaType: { format: "", previews: [] },
            };
            const u = withDefaults(null, a);
            t.endpoint = u;
        },
        668: (e, t, r) => {
            "use strict";
            Object.defineProperty(t, "__esModule", { value: true });
            var s = r(234);
            var o = r(429);
            const n = "4.5.8";
            class GraphqlError extends Error {
                constructor(e, t) {
                    const r = t.data.errors[0].message;
                    super(r);
                    Object.assign(this, t.data);
                    Object.assign(this, { headers: t.headers });
                    this.name = "GraphqlError";
                    this.request = e;
                    if (Error.captureStackTrace) {
                        Error.captureStackTrace(this, this.constructor);
                    }
                }
            }
            const i = [
                "method",
                "baseUrl",
                "url",
                "headers",
                "request",
                "query",
                "mediaType",
            ];
            const c = /\/api\/v3\/?$/;
            function graphql(e, t, r) {
                if (typeof t === "string" && r && "query" in r) {
                    return Promise.reject(
                        new Error(
                            `[@octokit/graphql] "query" cannot be used as variable name`
                        )
                    );
                }
                const s =
                    typeof t === "string" ? Object.assign({ query: t }, r) : t;
                const o = Object.keys(s).reduce((e, t) => {
                    if (i.includes(t)) {
                        e[t] = s[t];
                        return e;
                    }
                    if (!e.variables) {
                        e.variables = {};
                    }
                    e.variables[t] = s[t];
                    return e;
                }, {});
                const n = s.baseUrl || e.endpoint.DEFAULTS.baseUrl;
                if (c.test(n)) {
                    o.url = n.replace(c, "/api/graphql");
                }
                return e(o).then((e) => {
                    if (e.data.errors) {
                        const t = {};
                        for (const r of Object.keys(e.headers)) {
                            t[r] = e.headers[r];
                        }
                        throw new GraphqlError(o, { headers: t, data: e.data });
                    }
                    return e.data.data;
                });
            }
            function withDefaults(e, t) {
                const r = e.defaults(t);
                const o = (e, t) => {
                    return graphql(r, e, t);
                };
                return Object.assign(o, {
                    defaults: withDefaults.bind(null, r),
                    endpoint: s.request.endpoint,
                });
            }
            const a = withDefaults(s.request, {
                headers: {
                    "user-agent": `octokit-graphql.js/${n} ${o.getUserAgent()}`,
                },
                method: "POST",
                url: "/graphql",
            });
            function withCustomRequest(e) {
                return withDefaults(e, { method: "POST", url: "/graphql" });
            }
            t.graphql = a;
            t.withCustomRequest = withCustomRequest;
        },
        193: (e, t) => {
            "use strict";
            Object.defineProperty(t, "__esModule", { value: true });
            const r = "2.6.2";
            function normalizePaginatedListResponse(e) {
                const t = "total_count" in e.data && !("url" in e.data);
                if (!t) return e;
                const r = e.data.incomplete_results;
                const s = e.data.repository_selection;
                const o = e.data.total_count;
                delete e.data.incomplete_results;
                delete e.data.repository_selection;
                delete e.data.total_count;
                const n = Object.keys(e.data)[0];
                const i = e.data[n];
                e.data = i;
                if (typeof r !== "undefined") {
                    e.data.incomplete_results = r;
                }
                if (typeof s !== "undefined") {
                    e.data.repository_selection = s;
                }
                e.data.total_count = o;
                return e;
            }
            function iterator(e, t, r) {
                const s =
                    typeof t === "function"
                        ? t.endpoint(r)
                        : e.request.endpoint(t, r);
                const o = typeof t === "function" ? t : e.request;
                const n = s.method;
                const i = s.headers;
                let c = s.url;
                return {
                    [Symbol.asyncIterator]: () => ({
                        async next() {
                            if (!c) return { done: true };
                            const e = await o({
                                method: n,
                                url: c,
                                headers: i,
                            });
                            const t = normalizePaginatedListResponse(e);
                            c = ((t.headers.link || "").match(
                                /<([^>]+)>;\s*rel="next"/
                            ) || [])[1];
                            return { value: t };
                        },
                    }),
                };
            }
            function paginate(e, t, r, s) {
                if (typeof r === "function") {
                    s = r;
                    r = undefined;
                }
                return gather(
                    e,
                    [],
                    iterator(e, t, r)[Symbol.asyncIterator](),
                    s
                );
            }
            function gather(e, t, r, s) {
                return r.next().then((o) => {
                    if (o.done) {
                        return t;
                    }
                    let n = false;
                    function done() {
                        n = true;
                    }
                    t = t.concat(s ? s(o.value, done) : o.value.data);
                    if (n) {
                        return t;
                    }
                    return gather(e, t, r, s);
                });
            }
            const s = Object.assign(paginate, { iterator: iterator });
            function paginateRest(e) {
                return {
                    paginate: Object.assign(paginate.bind(null, e), {
                        iterator: iterator.bind(null, e),
                    }),
                };
            }
            paginateRest.VERSION = r;
            t.composePaginateRest = s;
            t.paginateRest = paginateRest;
        },
        44: (e, t) => {
            "use strict";
            Object.defineProperty(t, "__esModule", { value: true });
            const r = {
                actions: {
                    addSelectedRepoToOrgSecret: [
                        "PUT /orgs/{org}/actions/secrets/{secret_name}/repositories/{repository_id}",
                    ],
                    cancelWorkflowRun: [
                        "POST /repos/{owner}/{repo}/actions/runs/{run_id}/cancel",
                    ],
                    createOrUpdateOrgSecret: [
                        "PUT /orgs/{org}/actions/secrets/{secret_name}",
                    ],
                    createOrUpdateRepoSecret: [
                        "PUT /repos/{owner}/{repo}/actions/secrets/{secret_name}",
                    ],
                    createRegistrationTokenForOrg: [
                        "POST /orgs/{org}/actions/runners/registration-token",
                    ],
                    createRegistrationTokenForRepo: [
                        "POST /repos/{owner}/{repo}/actions/runners/registration-token",
                    ],
                    createRemoveTokenForOrg: [
                        "POST /orgs/{org}/actions/runners/remove-token",
                    ],
                    createRemoveTokenForRepo: [
                        "POST /repos/{owner}/{repo}/actions/runners/remove-token",
                    ],
                    createWorkflowDispatch: [
                        "POST /repos/{owner}/{repo}/actions/workflows/{workflow_id}/dispatches",
                    ],
                    deleteArtifact: [
                        "DELETE /repos/{owner}/{repo}/actions/artifacts/{artifact_id}",
                    ],
                    deleteOrgSecret: [
                        "DELETE /orgs/{org}/actions/secrets/{secret_name}",
                    ],
                    deleteRepoSecret: [
                        "DELETE /repos/{owner}/{repo}/actions/secrets/{secret_name}",
                    ],
                    deleteSelfHostedRunnerFromOrg: [
                        "DELETE /orgs/{org}/actions/runners/{runner_id}",
                    ],
                    deleteSelfHostedRunnerFromRepo: [
                        "DELETE /repos/{owner}/{repo}/actions/runners/{runner_id}",
                    ],
                    deleteWorkflowRun: [
                        "DELETE /repos/{owner}/{repo}/actions/runs/{run_id}",
                    ],
                    deleteWorkflowRunLogs: [
                        "DELETE /repos/{owner}/{repo}/actions/runs/{run_id}/logs",
                    ],
                    disableSelectedRepositoryGithubActionsOrganization: [
                        "DELETE /orgs/{org}/actions/permissions/repositories/{repository_id}",
                    ],
                    disableWorkflow: [
                        "PUT /repos/{owner}/{repo}/actions/workflows/{workflow_id}/disable",
                    ],
                    downloadArtifact: [
                        "GET /repos/{owner}/{repo}/actions/artifacts/{artifact_id}/{archive_format}",
                    ],
                    downloadJobLogsForWorkflowRun: [
                        "GET /repos/{owner}/{repo}/actions/jobs/{job_id}/logs",
                    ],
                    downloadWorkflowRunLogs: [
                        "GET /repos/{owner}/{repo}/actions/runs/{run_id}/logs",
                    ],
                    enableSelectedRepositoryGithubActionsOrganization: [
                        "PUT /orgs/{org}/actions/permissions/repositories/{repository_id}",
                    ],
                    enableWorkflow: [
                        "PUT /repos/{owner}/{repo}/actions/workflows/{workflow_id}/enable",
                    ],
                    getAllowedActionsOrganization: [
                        "GET /orgs/{org}/actions/permissions/selected-actions",
                    ],
                    getAllowedActionsRepository: [
                        "GET /repos/{owner}/{repo}/actions/permissions/selected-actions",
                    ],
                    getArtifact: [
                        "GET /repos/{owner}/{repo}/actions/artifacts/{artifact_id}",
                    ],
                    getGithubActionsPermissionsOrganization: [
                        "GET /orgs/{org}/actions/permissions",
                    ],
                    getGithubActionsPermissionsRepository: [
                        "GET /repos/{owner}/{repo}/actions/permissions",
                    ],
                    getJobForWorkflowRun: [
                        "GET /repos/{owner}/{repo}/actions/jobs/{job_id}",
                    ],
                    getOrgPublicKey: [
                        "GET /orgs/{org}/actions/secrets/public-key",
                    ],
                    getOrgSecret: [
                        "GET /orgs/{org}/actions/secrets/{secret_name}",
                    ],
                    getRepoPermissions: [
                        "GET /repos/{owner}/{repo}/actions/permissions",
                        {},
                        {
                            renamed: [
                                "actions",
                                "getGithubActionsPermissionsRepository",
                            ],
                        },
                    ],
                    getRepoPublicKey: [
                        "GET /repos/{owner}/{repo}/actions/secrets/public-key",
                    ],
                    getRepoSecret: [
                        "GET /repos/{owner}/{repo}/actions/secrets/{secret_name}",
                    ],
                    getSelfHostedRunnerForOrg: [
                        "GET /orgs/{org}/actions/runners/{runner_id}",
                    ],
                    getSelfHostedRunnerForRepo: [
                        "GET /repos/{owner}/{repo}/actions/runners/{runner_id}",
                    ],
                    getWorkflow: [
                        "GET /repos/{owner}/{repo}/actions/workflows/{workflow_id}",
                    ],
                    getWorkflowRun: [
                        "GET /repos/{owner}/{repo}/actions/runs/{run_id}",
                    ],
                    getWorkflowRunUsage: [
                        "GET /repos/{owner}/{repo}/actions/runs/{run_id}/timing",
                    ],
                    getWorkflowUsage: [
                        "GET /repos/{owner}/{repo}/actions/workflows/{workflow_id}/timing",
                    ],
                    listArtifactsForRepo: [
                        "GET /repos/{owner}/{repo}/actions/artifacts",
                    ],
                    listJobsForWorkflowRun: [
                        "GET /repos/{owner}/{repo}/actions/runs/{run_id}/jobs",
                    ],
                    listOrgSecrets: ["GET /orgs/{org}/actions/secrets"],
                    listRepoSecrets: [
                        "GET /repos/{owner}/{repo}/actions/secrets",
                    ],
                    listRepoWorkflows: [
                        "GET /repos/{owner}/{repo}/actions/workflows",
                    ],
                    listRunnerApplicationsForOrg: [
                        "GET /orgs/{org}/actions/runners/downloads",
                    ],
                    listRunnerApplicationsForRepo: [
                        "GET /repos/{owner}/{repo}/actions/runners/downloads",
                    ],
                    listSelectedReposForOrgSecret: [
                        "GET /orgs/{org}/actions/secrets/{secret_name}/repositories",
                    ],
                    listSelectedRepositoriesEnabledGithubActionsOrganization: [
                        "GET /orgs/{org}/actions/permissions/repositories",
                    ],
                    listSelfHostedRunnersForOrg: [
                        "GET /orgs/{org}/actions/runners",
                    ],
                    listSelfHostedRunnersForRepo: [
                        "GET /repos/{owner}/{repo}/actions/runners",
                    ],
                    listWorkflowRunArtifacts: [
                        "GET /repos/{owner}/{repo}/actions/runs/{run_id}/artifacts",
                    ],
                    listWorkflowRuns: [
                        "GET /repos/{owner}/{repo}/actions/workflows/{workflow_id}/runs",
                    ],
                    listWorkflowRunsForRepo: [
                        "GET /repos/{owner}/{repo}/actions/runs",
                    ],
                    reRunWorkflow: [
                        "POST /repos/{owner}/{repo}/actions/runs/{run_id}/rerun",
                    ],
                    removeSelectedRepoFromOrgSecret: [
                        "DELETE /orgs/{org}/actions/secrets/{secret_name}/repositories/{repository_id}",
                    ],
                    setAllowedActionsOrganization: [
                        "PUT /orgs/{org}/actions/permissions/selected-actions",
                    ],
                    setAllowedActionsRepository: [
                        "PUT /repos/{owner}/{repo}/actions/permissions/selected-actions",
                    ],
                    setGithubActionsPermissionsOrganization: [
                        "PUT /orgs/{org}/actions/permissions",
                    ],
                    setGithubActionsPermissionsRepository: [
                        "PUT /repos/{owner}/{repo}/actions/permissions",
                    ],
                    setSelectedReposForOrgSecret: [
                        "PUT /orgs/{org}/actions/secrets/{secret_name}/repositories",
                    ],
                    setSelectedRepositoriesEnabledGithubActionsOrganization: [
                        "PUT /orgs/{org}/actions/permissions/repositories",
                    ],
                },
                activity: {
                    checkRepoIsStarredByAuthenticatedUser: [
                        "GET /user/starred/{owner}/{repo}",
                    ],
                    deleteRepoSubscription: [
                        "DELETE /repos/{owner}/{repo}/subscription",
                    ],
                    deleteThreadSubscription: [
                        "DELETE /notifications/threads/{thread_id}/subscription",
                    ],
                    getFeeds: ["GET /feeds"],
                    getRepoSubscription: [
                        "GET /repos/{owner}/{repo}/subscription",
                    ],
                    getThread: ["GET /notifications/threads/{thread_id}"],
                    getThreadSubscriptionForAuthenticatedUser: [
                        "GET /notifications/threads/{thread_id}/subscription",
                    ],
                    listEventsForAuthenticatedUser: [
                        "GET /users/{username}/events",
                    ],
                    listNotificationsForAuthenticatedUser: [
                        "GET /notifications",
                    ],
                    listOrgEventsForAuthenticatedUser: [
                        "GET /users/{username}/events/orgs/{org}",
                    ],
                    listPublicEvents: ["GET /events"],
                    listPublicEventsForRepoNetwork: [
                        "GET /networks/{owner}/{repo}/events",
                    ],
                    listPublicEventsForUser: [
                        "GET /users/{username}/events/public",
                    ],
                    listPublicOrgEvents: ["GET /orgs/{org}/events"],
                    listReceivedEventsForUser: [
                        "GET /users/{username}/received_events",
                    ],
                    listReceivedPublicEventsForUser: [
                        "GET /users/{username}/received_events/public",
                    ],
                    listRepoEvents: ["GET /repos/{owner}/{repo}/events"],
                    listRepoNotificationsForAuthenticatedUser: [
                        "GET /repos/{owner}/{repo}/notifications",
                    ],
                    listReposStarredByAuthenticatedUser: ["GET /user/starred"],
                    listReposStarredByUser: ["GET /users/{username}/starred"],
                    listReposWatchedByUser: [
                        "GET /users/{username}/subscriptions",
                    ],
                    listStargazersForRepo: [
                        "GET /repos/{owner}/{repo}/stargazers",
                    ],
                    listWatchedReposForAuthenticatedUser: [
                        "GET /user/subscriptions",
                    ],
                    listWatchersForRepo: [
                        "GET /repos/{owner}/{repo}/subscribers",
                    ],
                    markNotificationsAsRead: ["PUT /notifications"],
                    markRepoNotificationsAsRead: [
                        "PUT /repos/{owner}/{repo}/notifications",
                    ],
                    markThreadAsRead: [
                        "PATCH /notifications/threads/{thread_id}",
                    ],
                    setRepoSubscription: [
                        "PUT /repos/{owner}/{repo}/subscription",
                    ],
                    setThreadSubscription: [
                        "PUT /notifications/threads/{thread_id}/subscription",
                    ],
                    starRepoForAuthenticatedUser: [
                        "PUT /user/starred/{owner}/{repo}",
                    ],
                    unstarRepoForAuthenticatedUser: [
                        "DELETE /user/starred/{owner}/{repo}",
                    ],
                },
                apps: {
                    addRepoToInstallation: [
                        "PUT /user/installations/{installation_id}/repositories/{repository_id}",
                    ],
                    checkToken: ["POST /applications/{client_id}/token"],
                    createContentAttachment: [
                        "POST /content_references/{content_reference_id}/attachments",
                        { mediaType: { previews: ["corsair"] } },
                    ],
                    createFromManifest: [
                        "POST /app-manifests/{code}/conversions",
                    ],
                    createInstallationAccessToken: [
                        "POST /app/installations/{installation_id}/access_tokens",
                    ],
                    deleteAuthorization: [
                        "DELETE /applications/{client_id}/grant",
                    ],
                    deleteInstallation: [
                        "DELETE /app/installations/{installation_id}",
                    ],
                    deleteToken: ["DELETE /applications/{client_id}/token"],
                    getAuthenticated: ["GET /app"],
                    getBySlug: ["GET /apps/{app_slug}"],
                    getInstallation: [
                        "GET /app/installations/{installation_id}",
                    ],
                    getOrgInstallation: ["GET /orgs/{org}/installation"],
                    getRepoInstallation: [
                        "GET /repos/{owner}/{repo}/installation",
                    ],
                    getSubscriptionPlanForAccount: [
                        "GET /marketplace_listing/accounts/{account_id}",
                    ],
                    getSubscriptionPlanForAccountStubbed: [
                        "GET /marketplace_listing/stubbed/accounts/{account_id}",
                    ],
                    getUserInstallation: ["GET /users/{username}/installation"],
                    getWebhookConfigForApp: ["GET /app/hook/config"],
                    listAccountsForPlan: [
                        "GET /marketplace_listing/plans/{plan_id}/accounts",
                    ],
                    listAccountsForPlanStubbed: [
                        "GET /marketplace_listing/stubbed/plans/{plan_id}/accounts",
                    ],
                    listInstallationReposForAuthenticatedUser: [
                        "GET /user/installations/{installation_id}/repositories",
                    ],
                    listInstallations: ["GET /app/installations"],
                    listInstallationsForAuthenticatedUser: [
                        "GET /user/installations",
                    ],
                    listPlans: ["GET /marketplace_listing/plans"],
                    listPlansStubbed: [
                        "GET /marketplace_listing/stubbed/plans",
                    ],
                    listReposAccessibleToInstallation: [
                        "GET /installation/repositories",
                    ],
                    listSubscriptionsForAuthenticatedUser: [
                        "GET /user/marketplace_purchases",
                    ],
                    listSubscriptionsForAuthenticatedUserStubbed: [
                        "GET /user/marketplace_purchases/stubbed",
                    ],
                    removeRepoFromInstallation: [
                        "DELETE /user/installations/{installation_id}/repositories/{repository_id}",
                    ],
                    resetToken: ["PATCH /applications/{client_id}/token"],
                    revokeInstallationAccessToken: [
                        "DELETE /installation/token",
                    ],
                    suspendInstallation: [
                        "PUT /app/installations/{installation_id}/suspended",
                    ],
                    unsuspendInstallation: [
                        "DELETE /app/installations/{installation_id}/suspended",
                    ],
                    updateWebhookConfigForApp: ["PATCH /app/hook/config"],
                },
                billing: {
                    getGithubActionsBillingOrg: [
                        "GET /orgs/{org}/settings/billing/actions",
                    ],
                    getGithubActionsBillingUser: [
                        "GET /users/{username}/settings/billing/actions",
                    ],
                    getGithubPackagesBillingOrg: [
                        "GET /orgs/{org}/settings/billing/packages",
                    ],
                    getGithubPackagesBillingUser: [
                        "GET /users/{username}/settings/billing/packages",
                    ],
                    getSharedStorageBillingOrg: [
                        "GET /orgs/{org}/settings/billing/shared-storage",
                    ],
                    getSharedStorageBillingUser: [
                        "GET /users/{username}/settings/billing/shared-storage",
                    ],
                },
                checks: {
                    create: ["POST /repos/{owner}/{repo}/check-runs"],
                    createSuite: ["POST /repos/{owner}/{repo}/check-suites"],
                    get: [
                        "GET /repos/{owner}/{repo}/check-runs/{check_run_id}",
                    ],
                    getSuite: [
                        "GET /repos/{owner}/{repo}/check-suites/{check_suite_id}",
                    ],
                    listAnnotations: [
                        "GET /repos/{owner}/{repo}/check-runs/{check_run_id}/annotations",
                    ],
                    listForRef: [
                        "GET /repos/{owner}/{repo}/commits/{ref}/check-runs",
                    ],
                    listForSuite: [
                        "GET /repos/{owner}/{repo}/check-suites/{check_suite_id}/check-runs",
                    ],
                    listSuitesForRef: [
                        "GET /repos/{owner}/{repo}/commits/{ref}/check-suites",
                    ],
                    rerequestSuite: [
                        "POST /repos/{owner}/{repo}/check-suites/{check_suite_id}/rerequest",
                    ],
                    setSuitesPreferences: [
                        "PATCH /repos/{owner}/{repo}/check-suites/preferences",
                    ],
                    update: [
                        "PATCH /repos/{owner}/{repo}/check-runs/{check_run_id}",
                    ],
                },
                codeScanning: {
                    getAlert: [
                        "GET /repos/{owner}/{repo}/code-scanning/alerts/{alert_number}",
                        {},
                        { renamedParameters: { alert_id: "alert_number" } },
                    ],
                    listAlertsForRepo: [
                        "GET /repos/{owner}/{repo}/code-scanning/alerts",
                    ],
                    listRecentAnalyses: [
                        "GET /repos/{owner}/{repo}/code-scanning/analyses",
                    ],
                    updateAlert: [
                        "PATCH /repos/{owner}/{repo}/code-scanning/alerts/{alert_number}",
                    ],
                    uploadSarif: [
                        "POST /repos/{owner}/{repo}/code-scanning/sarifs",
                    ],
                },
                codesOfConduct: {
                    getAllCodesOfConduct: [
                        "GET /codes_of_conduct",
                        { mediaType: { previews: ["scarlet-witch"] } },
                    ],
                    getConductCode: [
                        "GET /codes_of_conduct/{key}",
                        { mediaType: { previews: ["scarlet-witch"] } },
                    ],
                    getForRepo: [
                        "GET /repos/{owner}/{repo}/community/code_of_conduct",
                        { mediaType: { previews: ["scarlet-witch"] } },
                    ],
                },
                emojis: { get: ["GET /emojis"] },
                enterpriseAdmin: {
                    disableSelectedOrganizationGithubActionsEnterprise: [
                        "DELETE /enterprises/{enterprise}/actions/permissions/organizations/{org_id}",
                    ],
                    enableSelectedOrganizationGithubActionsEnterprise: [
                        "PUT /enterprises/{enterprise}/actions/permissions/organizations/{org_id}",
                    ],
                    getAllowedActionsEnterprise: [
                        "GET /enterprises/{enterprise}/actions/permissions/selected-actions",
                    ],
                    getGithubActionsPermissionsEnterprise: [
                        "GET /enterprises/{enterprise}/actions/permissions",
                    ],
                    listSelectedOrganizationsEnabledGithubActionsEnterprise: [
                        "GET /enterprises/{enterprise}/actions/permissions/organizations",
                    ],
                    setAllowedActionsEnterprise: [
                        "PUT /enterprises/{enterprise}/actions/permissions/selected-actions",
                    ],
                    setGithubActionsPermissionsEnterprise: [
                        "PUT /enterprises/{enterprise}/actions/permissions",
                    ],
                    setSelectedOrganizationsEnabledGithubActionsEnterprise: [
                        "PUT /enterprises/{enterprise}/actions/permissions/organizations",
                    ],
                },
                gists: {
                    checkIsStarred: ["GET /gists/{gist_id}/star"],
                    create: ["POST /gists"],
                    createComment: ["POST /gists/{gist_id}/comments"],
                    delete: ["DELETE /gists/{gist_id}"],
                    deleteComment: [
                        "DELETE /gists/{gist_id}/comments/{comment_id}",
                    ],
                    fork: ["POST /gists/{gist_id}/forks"],
                    get: ["GET /gists/{gist_id}"],
                    getComment: ["GET /gists/{gist_id}/comments/{comment_id}"],
                    getRevision: ["GET /gists/{gist_id}/{sha}"],
                    list: ["GET /gists"],
                    listComments: ["GET /gists/{gist_id}/comments"],
                    listCommits: ["GET /gists/{gist_id}/commits"],
                    listForUser: ["GET /users/{username}/gists"],
                    listForks: ["GET /gists/{gist_id}/forks"],
                    listPublic: ["GET /gists/public"],
                    listStarred: ["GET /gists/starred"],
                    star: ["PUT /gists/{gist_id}/star"],
                    unstar: ["DELETE /gists/{gist_id}/star"],
                    update: ["PATCH /gists/{gist_id}"],
                    updateComment: [
                        "PATCH /gists/{gist_id}/comments/{comment_id}",
                    ],
                },
                git: {
                    createBlob: ["POST /repos/{owner}/{repo}/git/blobs"],
                    createCommit: ["POST /repos/{owner}/{repo}/git/commits"],
                    createRef: ["POST /repos/{owner}/{repo}/git/refs"],
                    createTag: ["POST /repos/{owner}/{repo}/git/tags"],
                    createTree: ["POST /repos/{owner}/{repo}/git/trees"],
                    deleteRef: ["DELETE /repos/{owner}/{repo}/git/refs/{ref}"],
                    getBlob: ["GET /repos/{owner}/{repo}/git/blobs/{file_sha}"],
                    getCommit: [
                        "GET /repos/{owner}/{repo}/git/commits/{commit_sha}",
                    ],
                    getRef: ["GET /repos/{owner}/{repo}/git/ref/{ref}"],
                    getTag: ["GET /repos/{owner}/{repo}/git/tags/{tag_sha}"],
                    getTree: ["GET /repos/{owner}/{repo}/git/trees/{tree_sha}"],
                    listMatchingRefs: [
                        "GET /repos/{owner}/{repo}/git/matching-refs/{ref}",
                    ],
                    updateRef: ["PATCH /repos/{owner}/{repo}/git/refs/{ref}"],
                },
                gitignore: {
                    getAllTemplates: ["GET /gitignore/templates"],
                    getTemplate: ["GET /gitignore/templates/{name}"],
                },
                interactions: {
                    getRestrictionsForOrg: [
                        "GET /orgs/{org}/interaction-limits",
                    ],
                    getRestrictionsForRepo: [
                        "GET /repos/{owner}/{repo}/interaction-limits",
                    ],
                    getRestrictionsForYourPublicRepos: [
                        "GET /user/interaction-limits",
                    ],
                    removeRestrictionsForOrg: [
                        "DELETE /orgs/{org}/interaction-limits",
                    ],
                    removeRestrictionsForRepo: [
                        "DELETE /repos/{owner}/{repo}/interaction-limits",
                    ],
                    removeRestrictionsForYourPublicRepos: [
                        "DELETE /user/interaction-limits",
                    ],
                    setRestrictionsForOrg: [
                        "PUT /orgs/{org}/interaction-limits",
                    ],
                    setRestrictionsForRepo: [
                        "PUT /repos/{owner}/{repo}/interaction-limits",
                    ],
                    setRestrictionsForYourPublicRepos: [
                        "PUT /user/interaction-limits",
                    ],
                },
                issues: {
                    addAssignees: [
                        "POST /repos/{owner}/{repo}/issues/{issue_number}/assignees",
                    ],
                    addLabels: [
                        "POST /repos/{owner}/{repo}/issues/{issue_number}/labels",
                    ],
                    checkUserCanBeAssigned: [
                        "GET /repos/{owner}/{repo}/assignees/{assignee}",
                    ],
                    create: ["POST /repos/{owner}/{repo}/issues"],
                    createComment: [
                        "POST /repos/{owner}/{repo}/issues/{issue_number}/comments",
                    ],
                    createLabel: ["POST /repos/{owner}/{repo}/labels"],
                    createMilestone: ["POST /repos/{owner}/{repo}/milestones"],
                    deleteComment: [
                        "DELETE /repos/{owner}/{repo}/issues/comments/{comment_id}",
                    ],
                    deleteLabel: ["DELETE /repos/{owner}/{repo}/labels/{name}"],
                    deleteMilestone: [
                        "DELETE /repos/{owner}/{repo}/milestones/{milestone_number}",
                    ],
                    get: ["GET /repos/{owner}/{repo}/issues/{issue_number}"],
                    getComment: [
                        "GET /repos/{owner}/{repo}/issues/comments/{comment_id}",
                    ],
                    getEvent: [
                        "GET /repos/{owner}/{repo}/issues/events/{event_id}",
                    ],
                    getLabel: ["GET /repos/{owner}/{repo}/labels/{name}"],
                    getMilestone: [
                        "GET /repos/{owner}/{repo}/milestones/{milestone_number}",
                    ],
                    list: ["GET /issues"],
                    listAssignees: ["GET /repos/{owner}/{repo}/assignees"],
                    listComments: [
                        "GET /repos/{owner}/{repo}/issues/{issue_number}/comments",
                    ],
                    listCommentsForRepo: [
                        "GET /repos/{owner}/{repo}/issues/comments",
                    ],
                    listEvents: [
                        "GET /repos/{owner}/{repo}/issues/{issue_number}/events",
                    ],
                    listEventsForRepo: [
                        "GET /repos/{owner}/{repo}/issues/events",
                    ],
                    listEventsForTimeline: [
                        "GET /repos/{owner}/{repo}/issues/{issue_number}/timeline",
                        { mediaType: { previews: ["mockingbird"] } },
                    ],
                    listForAuthenticatedUser: ["GET /user/issues"],
                    listForOrg: ["GET /orgs/{org}/issues"],
                    listForRepo: ["GET /repos/{owner}/{repo}/issues"],
                    listLabelsForMilestone: [
                        "GET /repos/{owner}/{repo}/milestones/{milestone_number}/labels",
                    ],
                    listLabelsForRepo: ["GET /repos/{owner}/{repo}/labels"],
                    listLabelsOnIssue: [
                        "GET /repos/{owner}/{repo}/issues/{issue_number}/labels",
                    ],
                    listMilestones: ["GET /repos/{owner}/{repo}/milestones"],
                    lock: [
                        "PUT /repos/{owner}/{repo}/issues/{issue_number}/lock",
                    ],
                    removeAllLabels: [
                        "DELETE /repos/{owner}/{repo}/issues/{issue_number}/labels",
                    ],
                    removeAssignees: [
                        "DELETE /repos/{owner}/{repo}/issues/{issue_number}/assignees",
                    ],
                    removeLabel: [
                        "DELETE /repos/{owner}/{repo}/issues/{issue_number}/labels/{name}",
                    ],
                    setLabels: [
                        "PUT /repos/{owner}/{repo}/issues/{issue_number}/labels",
                    ],
                    unlock: [
                        "DELETE /repos/{owner}/{repo}/issues/{issue_number}/lock",
                    ],
                    update: [
                        "PATCH /repos/{owner}/{repo}/issues/{issue_number}",
                    ],
                    updateComment: [
                        "PATCH /repos/{owner}/{repo}/issues/comments/{comment_id}",
                    ],
                    updateLabel: ["PATCH /repos/{owner}/{repo}/labels/{name}"],
                    updateMilestone: [
                        "PATCH /repos/{owner}/{repo}/milestones/{milestone_number}",
                    ],
                },
                licenses: {
                    get: ["GET /licenses/{license}"],
                    getAllCommonlyUsed: ["GET /licenses"],
                    getForRepo: ["GET /repos/{owner}/{repo}/license"],
                },
                markdown: {
                    render: ["POST /markdown"],
                    renderRaw: [
                        "POST /markdown/raw",
                        {
                            headers: {
                                "content-type": "text/plain; charset=utf-8",
                            },
                        },
                    ],
                },
                meta: {
                    get: ["GET /meta"],
                    getOctocat: ["GET /octocat"],
                    getZen: ["GET /zen"],
                    root: ["GET /"],
                },
                migrations: {
                    cancelImport: ["DELETE /repos/{owner}/{repo}/import"],
                    deleteArchiveForAuthenticatedUser: [
                        "DELETE /user/migrations/{migration_id}/archive",
                        { mediaType: { previews: ["wyandotte"] } },
                    ],
                    deleteArchiveForOrg: [
                        "DELETE /orgs/{org}/migrations/{migration_id}/archive",
                        { mediaType: { previews: ["wyandotte"] } },
                    ],
                    downloadArchiveForOrg: [
                        "GET /orgs/{org}/migrations/{migration_id}/archive",
                        { mediaType: { previews: ["wyandotte"] } },
                    ],
                    getArchiveForAuthenticatedUser: [
                        "GET /user/migrations/{migration_id}/archive",
                        { mediaType: { previews: ["wyandotte"] } },
                    ],
                    getCommitAuthors: [
                        "GET /repos/{owner}/{repo}/import/authors",
                    ],
                    getImportStatus: ["GET /repos/{owner}/{repo}/import"],
                    getLargeFiles: [
                        "GET /repos/{owner}/{repo}/import/large_files",
                    ],
                    getStatusForAuthenticatedUser: [
                        "GET /user/migrations/{migration_id}",
                        { mediaType: { previews: ["wyandotte"] } },
                    ],
                    getStatusForOrg: [
                        "GET /orgs/{org}/migrations/{migration_id}",
                        { mediaType: { previews: ["wyandotte"] } },
                    ],
                    listForAuthenticatedUser: [
                        "GET /user/migrations",
                        { mediaType: { previews: ["wyandotte"] } },
                    ],
                    listForOrg: [
                        "GET /orgs/{org}/migrations",
                        { mediaType: { previews: ["wyandotte"] } },
                    ],
                    listReposForOrg: [
                        "GET /orgs/{org}/migrations/{migration_id}/repositories",
                        { mediaType: { previews: ["wyandotte"] } },
                    ],
                    listReposForUser: [
                        "GET /user/migrations/{migration_id}/repositories",
                        { mediaType: { previews: ["wyandotte"] } },
                    ],
                    mapCommitAuthor: [
                        "PATCH /repos/{owner}/{repo}/import/authors/{author_id}",
                    ],
                    setLfsPreference: [
                        "PATCH /repos/{owner}/{repo}/import/lfs",
                    ],
                    startForAuthenticatedUser: ["POST /user/migrations"],
                    startForOrg: ["POST /orgs/{org}/migrations"],
                    startImport: ["PUT /repos/{owner}/{repo}/import"],
                    unlockRepoForAuthenticatedUser: [
                        "DELETE /user/migrations/{migration_id}/repos/{repo_name}/lock",
                        { mediaType: { previews: ["wyandotte"] } },
                    ],
                    unlockRepoForOrg: [
                        "DELETE /orgs/{org}/migrations/{migration_id}/repos/{repo_name}/lock",
                        { mediaType: { previews: ["wyandotte"] } },
                    ],
                    updateImport: ["PATCH /repos/{owner}/{repo}/import"],
                },
                orgs: {
                    blockUser: ["PUT /orgs/{org}/blocks/{username}"],
                    checkBlockedUser: ["GET /orgs/{org}/blocks/{username}"],
                    checkMembershipForUser: [
                        "GET /orgs/{org}/members/{username}",
                    ],
                    checkPublicMembershipForUser: [
                        "GET /orgs/{org}/public_members/{username}",
                    ],
                    convertMemberToOutsideCollaborator: [
                        "PUT /orgs/{org}/outside_collaborators/{username}",
                    ],
                    createInvitation: ["POST /orgs/{org}/invitations"],
                    createWebhook: ["POST /orgs/{org}/hooks"],
                    deleteWebhook: ["DELETE /orgs/{org}/hooks/{hook_id}"],
                    get: ["GET /orgs/{org}"],
                    getMembershipForAuthenticatedUser: [
                        "GET /user/memberships/orgs/{org}",
                    ],
                    getMembershipForUser: [
                        "GET /orgs/{org}/memberships/{username}",
                    ],
                    getWebhook: ["GET /orgs/{org}/hooks/{hook_id}"],
                    getWebhookConfigForOrg: [
                        "GET /orgs/{org}/hooks/{hook_id}/config",
                    ],
                    list: ["GET /organizations"],
                    listAppInstallations: ["GET /orgs/{org}/installations"],
                    listBlockedUsers: ["GET /orgs/{org}/blocks"],
                    listForAuthenticatedUser: ["GET /user/orgs"],
                    listForUser: ["GET /users/{username}/orgs"],
                    listInvitationTeams: [
                        "GET /orgs/{org}/invitations/{invitation_id}/teams",
                    ],
                    listMembers: ["GET /orgs/{org}/members"],
                    listMembershipsForAuthenticatedUser: [
                        "GET /user/memberships/orgs",
                    ],
                    listOutsideCollaborators: [
                        "GET /orgs/{org}/outside_collaborators",
                    ],
                    listPendingInvitations: ["GET /orgs/{org}/invitations"],
                    listPublicMembers: ["GET /orgs/{org}/public_members"],
                    listWebhooks: ["GET /orgs/{org}/hooks"],
                    pingWebhook: ["POST /orgs/{org}/hooks/{hook_id}/pings"],
                    removeMember: ["DELETE /orgs/{org}/members/{username}"],
                    removeMembershipForUser: [
                        "DELETE /orgs/{org}/memberships/{username}",
                    ],
                    removeOutsideCollaborator: [
                        "DELETE /orgs/{org}/outside_collaborators/{username}",
                    ],
                    removePublicMembershipForAuthenticatedUser: [
                        "DELETE /orgs/{org}/public_members/{username}",
                    ],
                    setMembershipForUser: [
                        "PUT /orgs/{org}/memberships/{username}",
                    ],
                    setPublicMembershipForAuthenticatedUser: [
                        "PUT /orgs/{org}/public_members/{username}",
                    ],
                    unblockUser: ["DELETE /orgs/{org}/blocks/{username}"],
                    update: ["PATCH /orgs/{org}"],
                    updateMembershipForAuthenticatedUser: [
                        "PATCH /user/memberships/orgs/{org}",
                    ],
                    updateWebhook: ["PATCH /orgs/{org}/hooks/{hook_id}"],
                    updateWebhookConfigForOrg: [
                        "PATCH /orgs/{org}/hooks/{hook_id}/config",
                    ],
                },
                projects: {
                    addCollaborator: [
                        "PUT /projects/{project_id}/collaborators/{username}",
                        { mediaType: { previews: ["inertia"] } },
                    ],
                    createCard: [
                        "POST /projects/columns/{column_id}/cards",
                        { mediaType: { previews: ["inertia"] } },
                    ],
                    createColumn: [
                        "POST /projects/{project_id}/columns",
                        { mediaType: { previews: ["inertia"] } },
                    ],
                    createForAuthenticatedUser: [
                        "POST /user/projects",
                        { mediaType: { previews: ["inertia"] } },
                    ],
                    createForOrg: [
                        "POST /orgs/{org}/projects",
                        { mediaType: { previews: ["inertia"] } },
                    ],
                    createForRepo: [
                        "POST /repos/{owner}/{repo}/projects",
                        { mediaType: { previews: ["inertia"] } },
                    ],
                    delete: [
                        "DELETE /projects/{project_id}",
                        { mediaType: { previews: ["inertia"] } },
                    ],
                    deleteCard: [
                        "DELETE /projects/columns/cards/{card_id}",
                        { mediaType: { previews: ["inertia"] } },
                    ],
                    deleteColumn: [
                        "DELETE /projects/columns/{column_id}",
                        { mediaType: { previews: ["inertia"] } },
                    ],
                    get: [
                        "GET /projects/{project_id}",
                        { mediaType: { previews: ["inertia"] } },
                    ],
                    getCard: [
                        "GET /projects/columns/cards/{card_id}",
                        { mediaType: { previews: ["inertia"] } },
                    ],
                    getColumn: [
                        "GET /projects/columns/{column_id}",
                        { mediaType: { previews: ["inertia"] } },
                    ],
                    getPermissionForUser: [
                        "GET /projects/{project_id}/collaborators/{username}/permission",
                        { mediaType: { previews: ["inertia"] } },
                    ],
                    listCards: [
                        "GET /projects/columns/{column_id}/cards",
                        { mediaType: { previews: ["inertia"] } },
                    ],
                    listCollaborators: [
                        "GET /projects/{project_id}/collaborators",
                        { mediaType: { previews: ["inertia"] } },
                    ],
                    listColumns: [
                        "GET /projects/{project_id}/columns",
                        { mediaType: { previews: ["inertia"] } },
                    ],
                    listForOrg: [
                        "GET /orgs/{org}/projects",
                        { mediaType: { previews: ["inertia"] } },
                    ],
                    listForRepo: [
                        "GET /repos/{owner}/{repo}/projects",
                        { mediaType: { previews: ["inertia"] } },
                    ],
                    listForUser: [
                        "GET /users/{username}/projects",
                        { mediaType: { previews: ["inertia"] } },
                    ],
                    moveCard: [
                        "POST /projects/columns/cards/{card_id}/moves",
                        { mediaType: { previews: ["inertia"] } },
                    ],
                    moveColumn: [
                        "POST /projects/columns/{column_id}/moves",
                        { mediaType: { previews: ["inertia"] } },
                    ],
                    removeCollaborator: [
                        "DELETE /projects/{project_id}/collaborators/{username}",
                        { mediaType: { previews: ["inertia"] } },
                    ],
                    update: [
                        "PATCH /projects/{project_id}",
                        { mediaType: { previews: ["inertia"] } },
                    ],
                    updateCard: [
                        "PATCH /projects/columns/cards/{card_id}",
                        { mediaType: { previews: ["inertia"] } },
                    ],
                    updateColumn: [
                        "PATCH /projects/columns/{column_id}",
                        { mediaType: { previews: ["inertia"] } },
                    ],
                },
                pulls: {
                    checkIfMerged: [
                        "GET /repos/{owner}/{repo}/pulls/{pull_number}/merge",
                    ],
                    create: ["POST /repos/{owner}/{repo}/pulls"],
                    createReplyForReviewComment: [
                        "POST /repos/{owner}/{repo}/pulls/{pull_number}/comments/{comment_id}/replies",
                    ],
                    createReview: [
                        "POST /repos/{owner}/{repo}/pulls/{pull_number}/reviews",
                    ],
                    createReviewComment: [
                        "POST /repos/{owner}/{repo}/pulls/{pull_number}/comments",
                    ],
                    deletePendingReview: [
                        "DELETE /repos/{owner}/{repo}/pulls/{pull_number}/reviews/{review_id}",
                    ],
                    deleteReviewComment: [
                        "DELETE /repos/{owner}/{repo}/pulls/comments/{comment_id}",
                    ],
                    dismissReview: [
                        "PUT /repos/{owner}/{repo}/pulls/{pull_number}/reviews/{review_id}/dismissals",
                    ],
                    get: ["GET /repos/{owner}/{repo}/pulls/{pull_number}"],
                    getReview: [
                        "GET /repos/{owner}/{repo}/pulls/{pull_number}/reviews/{review_id}",
                    ],
                    getReviewComment: [
                        "GET /repos/{owner}/{repo}/pulls/comments/{comment_id}",
                    ],
                    list: ["GET /repos/{owner}/{repo}/pulls"],
                    listCommentsForReview: [
                        "GET /repos/{owner}/{repo}/pulls/{pull_number}/reviews/{review_id}/comments",
                    ],
                    listCommits: [
                        "GET /repos/{owner}/{repo}/pulls/{pull_number}/commits",
                    ],
                    listFiles: [
                        "GET /repos/{owner}/{repo}/pulls/{pull_number}/files",
                    ],
                    listRequestedReviewers: [
                        "GET /repos/{owner}/{repo}/pulls/{pull_number}/requested_reviewers",
                    ],
                    listReviewComments: [
                        "GET /repos/{owner}/{repo}/pulls/{pull_number}/comments",
                    ],
                    listReviewCommentsForRepo: [
                        "GET /repos/{owner}/{repo}/pulls/comments",
                    ],
                    listReviews: [
                        "GET /repos/{owner}/{repo}/pulls/{pull_number}/reviews",
                    ],
                    merge: [
                        "PUT /repos/{owner}/{repo}/pulls/{pull_number}/merge",
                    ],
                    removeRequestedReviewers: [
                        "DELETE /repos/{owner}/{repo}/pulls/{pull_number}/requested_reviewers",
                    ],
                    requestReviewers: [
                        "POST /repos/{owner}/{repo}/pulls/{pull_number}/requested_reviewers",
                    ],
                    submitReview: [
                        "POST /repos/{owner}/{repo}/pulls/{pull_number}/reviews/{review_id}/events",
                    ],
                    update: ["PATCH /repos/{owner}/{repo}/pulls/{pull_number}"],
                    updateBranch: [
                        "PUT /repos/{owner}/{repo}/pulls/{pull_number}/update-branch",
                        { mediaType: { previews: ["lydian"] } },
                    ],
                    updateReview: [
                        "PUT /repos/{owner}/{repo}/pulls/{pull_number}/reviews/{review_id}",
                    ],
                    updateReviewComment: [
                        "PATCH /repos/{owner}/{repo}/pulls/comments/{comment_id}",
                    ],
                },
                rateLimit: { get: ["GET /rate_limit"] },
                reactions: {
                    createForCommitComment: [
                        "POST /repos/{owner}/{repo}/comments/{comment_id}/reactions",
                        { mediaType: { previews: ["squirrel-girl"] } },
                    ],
                    createForIssue: [
                        "POST /repos/{owner}/{repo}/issues/{issue_number}/reactions",
                        { mediaType: { previews: ["squirrel-girl"] } },
                    ],
                    createForIssueComment: [
                        "POST /repos/{owner}/{repo}/issues/comments/{comment_id}/reactions",
                        { mediaType: { previews: ["squirrel-girl"] } },
                    ],
                    createForPullRequestReviewComment: [
                        "POST /repos/{owner}/{repo}/pulls/comments/{comment_id}/reactions",
                        { mediaType: { previews: ["squirrel-girl"] } },
                    ],
                    createForTeamDiscussionCommentInOrg: [
                        "POST /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments/{comment_number}/reactions",
                        { mediaType: { previews: ["squirrel-girl"] } },
                    ],
                    createForTeamDiscussionInOrg: [
                        "POST /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/reactions",
                        { mediaType: { previews: ["squirrel-girl"] } },
                    ],
                    deleteForCommitComment: [
                        "DELETE /repos/{owner}/{repo}/comments/{comment_id}/reactions/{reaction_id}",
                        { mediaType: { previews: ["squirrel-girl"] } },
                    ],
                    deleteForIssue: [
                        "DELETE /repos/{owner}/{repo}/issues/{issue_number}/reactions/{reaction_id}",
                        { mediaType: { previews: ["squirrel-girl"] } },
                    ],
                    deleteForIssueComment: [
                        "DELETE /repos/{owner}/{repo}/issues/comments/{comment_id}/reactions/{reaction_id}",
                        { mediaType: { previews: ["squirrel-girl"] } },
                    ],
                    deleteForPullRequestComment: [
                        "DELETE /repos/{owner}/{repo}/pulls/comments/{comment_id}/reactions/{reaction_id}",
                        { mediaType: { previews: ["squirrel-girl"] } },
                    ],
                    deleteForTeamDiscussion: [
                        "DELETE /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/reactions/{reaction_id}",
                        { mediaType: { previews: ["squirrel-girl"] } },
                    ],
                    deleteForTeamDiscussionComment: [
                        "DELETE /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments/{comment_number}/reactions/{reaction_id}",
                        { mediaType: { previews: ["squirrel-girl"] } },
                    ],
                    deleteLegacy: [
                        "DELETE /reactions/{reaction_id}",
                        { mediaType: { previews: ["squirrel-girl"] } },
                        {
                            deprecated:
                                "octokit.reactions.deleteLegacy() is deprecated, see https://docs.github.com/v3/reactions/#delete-a-reaction-legacy",
                        },
                    ],
                    listForCommitComment: [
                        "GET /repos/{owner}/{repo}/comments/{comment_id}/reactions",
                        { mediaType: { previews: ["squirrel-girl"] } },
                    ],
                    listForIssue: [
                        "GET /repos/{owner}/{repo}/issues/{issue_number}/reactions",
                        { mediaType: { previews: ["squirrel-girl"] } },
                    ],
                    listForIssueComment: [
                        "GET /repos/{owner}/{repo}/issues/comments/{comment_id}/reactions",
                        { mediaType: { previews: ["squirrel-girl"] } },
                    ],
                    listForPullRequestReviewComment: [
                        "GET /repos/{owner}/{repo}/pulls/comments/{comment_id}/reactions",
                        { mediaType: { previews: ["squirrel-girl"] } },
                    ],
                    listForTeamDiscussionCommentInOrg: [
                        "GET /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments/{comment_number}/reactions",
                        { mediaType: { previews: ["squirrel-girl"] } },
                    ],
                    listForTeamDiscussionInOrg: [
                        "GET /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/reactions",
                        { mediaType: { previews: ["squirrel-girl"] } },
                    ],
                },
                repos: {
                    acceptInvitation: [
                        "PATCH /user/repository_invitations/{invitation_id}",
                    ],
                    addAppAccessRestrictions: [
                        "POST /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/apps",
                        {},
                        { mapToData: "apps" },
                    ],
                    addCollaborator: [
                        "PUT /repos/{owner}/{repo}/collaborators/{username}",
                    ],
                    addStatusCheckContexts: [
                        "POST /repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks/contexts",
                        {},
                        { mapToData: "contexts" },
                    ],
                    addTeamAccessRestrictions: [
                        "POST /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/teams",
                        {},
                        { mapToData: "teams" },
                    ],
                    addUserAccessRestrictions: [
                        "POST /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/users",
                        {},
                        { mapToData: "users" },
                    ],
                    checkCollaborator: [
                        "GET /repos/{owner}/{repo}/collaborators/{username}",
                    ],
                    checkVulnerabilityAlerts: [
                        "GET /repos/{owner}/{repo}/vulnerability-alerts",
                        { mediaType: { previews: ["dorian"] } },
                    ],
                    compareCommits: [
                        "GET /repos/{owner}/{repo}/compare/{base}...{head}",
                    ],
                    createCommitComment: [
                        "POST /repos/{owner}/{repo}/commits/{commit_sha}/comments",
                    ],
                    createCommitSignatureProtection: [
                        "POST /repos/{owner}/{repo}/branches/{branch}/protection/required_signatures",
                        { mediaType: { previews: ["zzzax"] } },
                    ],
                    createCommitStatus: [
                        "POST /repos/{owner}/{repo}/statuses/{sha}",
                    ],
                    createDeployKey: ["POST /repos/{owner}/{repo}/keys"],
                    createDeployment: [
                        "POST /repos/{owner}/{repo}/deployments",
                    ],
                    createDeploymentStatus: [
                        "POST /repos/{owner}/{repo}/deployments/{deployment_id}/statuses",
                    ],
                    createDispatchEvent: [
                        "POST /repos/{owner}/{repo}/dispatches",
                    ],
                    createForAuthenticatedUser: ["POST /user/repos"],
                    createFork: ["POST /repos/{owner}/{repo}/forks"],
                    createInOrg: ["POST /orgs/{org}/repos"],
                    createOrUpdateFileContents: [
                        "PUT /repos/{owner}/{repo}/contents/{path}",
                    ],
                    createPagesSite: [
                        "POST /repos/{owner}/{repo}/pages",
                        { mediaType: { previews: ["switcheroo"] } },
                    ],
                    createRelease: ["POST /repos/{owner}/{repo}/releases"],
                    createUsingTemplate: [
                        "POST /repos/{template_owner}/{template_repo}/generate",
                        { mediaType: { previews: ["baptiste"] } },
                    ],
                    createWebhook: ["POST /repos/{owner}/{repo}/hooks"],
                    declineInvitation: [
                        "DELETE /user/repository_invitations/{invitation_id}",
                    ],
                    delete: ["DELETE /repos/{owner}/{repo}"],
                    deleteAccessRestrictions: [
                        "DELETE /repos/{owner}/{repo}/branches/{branch}/protection/restrictions",
                    ],
                    deleteAdminBranchProtection: [
                        "DELETE /repos/{owner}/{repo}/branches/{branch}/protection/enforce_admins",
                    ],
                    deleteBranchProtection: [
                        "DELETE /repos/{owner}/{repo}/branches/{branch}/protection",
                    ],
                    deleteCommitComment: [
                        "DELETE /repos/{owner}/{repo}/comments/{comment_id}",
                    ],
                    deleteCommitSignatureProtection: [
                        "DELETE /repos/{owner}/{repo}/branches/{branch}/protection/required_signatures",
                        { mediaType: { previews: ["zzzax"] } },
                    ],
                    deleteDeployKey: [
                        "DELETE /repos/{owner}/{repo}/keys/{key_id}",
                    ],
                    deleteDeployment: [
                        "DELETE /repos/{owner}/{repo}/deployments/{deployment_id}",
                    ],
                    deleteFile: [
                        "DELETE /repos/{owner}/{repo}/contents/{path}",
                    ],
                    deleteInvitation: [
                        "DELETE /repos/{owner}/{repo}/invitations/{invitation_id}",
                    ],
                    deletePagesSite: [
                        "DELETE /repos/{owner}/{repo}/pages",
                        { mediaType: { previews: ["switcheroo"] } },
                    ],
                    deletePullRequestReviewProtection: [
                        "DELETE /repos/{owner}/{repo}/branches/{branch}/protection/required_pull_request_reviews",
                    ],
                    deleteRelease: [
                        "DELETE /repos/{owner}/{repo}/releases/{release_id}",
                    ],
                    deleteReleaseAsset: [
                        "DELETE /repos/{owner}/{repo}/releases/assets/{asset_id}",
                    ],
                    deleteWebhook: [
                        "DELETE /repos/{owner}/{repo}/hooks/{hook_id}",
                    ],
                    disableAutomatedSecurityFixes: [
                        "DELETE /repos/{owner}/{repo}/automated-security-fixes",
                        { mediaType: { previews: ["london"] } },
                    ],
                    disableVulnerabilityAlerts: [
                        "DELETE /repos/{owner}/{repo}/vulnerability-alerts",
                        { mediaType: { previews: ["dorian"] } },
                    ],
                    downloadArchive: [
                        "GET /repos/{owner}/{repo}/zipball/{ref}",
                        {},
                        { renamed: ["repos", "downloadZipballArchive"] },
                    ],
                    downloadTarballArchive: [
                        "GET /repos/{owner}/{repo}/tarball/{ref}",
                    ],
                    downloadZipballArchive: [
                        "GET /repos/{owner}/{repo}/zipball/{ref}",
                    ],
                    enableAutomatedSecurityFixes: [
                        "PUT /repos/{owner}/{repo}/automated-security-fixes",
                        { mediaType: { previews: ["london"] } },
                    ],
                    enableVulnerabilityAlerts: [
                        "PUT /repos/{owner}/{repo}/vulnerability-alerts",
                        { mediaType: { previews: ["dorian"] } },
                    ],
                    get: ["GET /repos/{owner}/{repo}"],
                    getAccessRestrictions: [
                        "GET /repos/{owner}/{repo}/branches/{branch}/protection/restrictions",
                    ],
                    getAdminBranchProtection: [
                        "GET /repos/{owner}/{repo}/branches/{branch}/protection/enforce_admins",
                    ],
                    getAllStatusCheckContexts: [
                        "GET /repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks/contexts",
                    ],
                    getAllTopics: [
                        "GET /repos/{owner}/{repo}/topics",
                        { mediaType: { previews: ["mercy"] } },
                    ],
                    getAppsWithAccessToProtectedBranch: [
                        "GET /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/apps",
                    ],
                    getBranch: ["GET /repos/{owner}/{repo}/branches/{branch}"],
                    getBranchProtection: [
                        "GET /repos/{owner}/{repo}/branches/{branch}/protection",
                    ],
                    getClones: ["GET /repos/{owner}/{repo}/traffic/clones"],
                    getCodeFrequencyStats: [
                        "GET /repos/{owner}/{repo}/stats/code_frequency",
                    ],
                    getCollaboratorPermissionLevel: [
                        "GET /repos/{owner}/{repo}/collaborators/{username}/permission",
                    ],
                    getCombinedStatusForRef: [
                        "GET /repos/{owner}/{repo}/commits/{ref}/status",
                    ],
                    getCommit: ["GET /repos/{owner}/{repo}/commits/{ref}"],
                    getCommitActivityStats: [
                        "GET /repos/{owner}/{repo}/stats/commit_activity",
                    ],
                    getCommitComment: [
                        "GET /repos/{owner}/{repo}/comments/{comment_id}",
                    ],
                    getCommitSignatureProtection: [
                        "GET /repos/{owner}/{repo}/branches/{branch}/protection/required_signatures",
                        { mediaType: { previews: ["zzzax"] } },
                    ],
                    getCommunityProfileMetrics: [
                        "GET /repos/{owner}/{repo}/community/profile",
                    ],
                    getContent: ["GET /repos/{owner}/{repo}/contents/{path}"],
                    getContributorsStats: [
                        "GET /repos/{owner}/{repo}/stats/contributors",
                    ],
                    getDeployKey: ["GET /repos/{owner}/{repo}/keys/{key_id}"],
                    getDeployment: [
                        "GET /repos/{owner}/{repo}/deployments/{deployment_id}",
                    ],
                    getDeploymentStatus: [
                        "GET /repos/{owner}/{repo}/deployments/{deployment_id}/statuses/{status_id}",
                    ],
                    getLatestPagesBuild: [
                        "GET /repos/{owner}/{repo}/pages/builds/latest",
                    ],
                    getLatestRelease: [
                        "GET /repos/{owner}/{repo}/releases/latest",
                    ],
                    getPages: ["GET /repos/{owner}/{repo}/pages"],
                    getPagesBuild: [
                        "GET /repos/{owner}/{repo}/pages/builds/{build_id}",
                    ],
                    getParticipationStats: [
                        "GET /repos/{owner}/{repo}/stats/participation",
                    ],
                    getPullRequestReviewProtection: [
                        "GET /repos/{owner}/{repo}/branches/{branch}/protection/required_pull_request_reviews",
                    ],
                    getPunchCardStats: [
                        "GET /repos/{owner}/{repo}/stats/punch_card",
                    ],
                    getReadme: ["GET /repos/{owner}/{repo}/readme"],
                    getRelease: [
                        "GET /repos/{owner}/{repo}/releases/{release_id}",
                    ],
                    getReleaseAsset: [
                        "GET /repos/{owner}/{repo}/releases/assets/{asset_id}",
                    ],
                    getReleaseByTag: [
                        "GET /repos/{owner}/{repo}/releases/tags/{tag}",
                    ],
                    getStatusChecksProtection: [
                        "GET /repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks",
                    ],
                    getTeamsWithAccessToProtectedBranch: [
                        "GET /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/teams",
                    ],
                    getTopPaths: [
                        "GET /repos/{owner}/{repo}/traffic/popular/paths",
                    ],
                    getTopReferrers: [
                        "GET /repos/{owner}/{repo}/traffic/popular/referrers",
                    ],
                    getUsersWithAccessToProtectedBranch: [
                        "GET /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/users",
                    ],
                    getViews: ["GET /repos/{owner}/{repo}/traffic/views"],
                    getWebhook: ["GET /repos/{owner}/{repo}/hooks/{hook_id}"],
                    getWebhookConfigForRepo: [
                        "GET /repos/{owner}/{repo}/hooks/{hook_id}/config",
                    ],
                    listBranches: ["GET /repos/{owner}/{repo}/branches"],
                    listBranchesForHeadCommit: [
                        "GET /repos/{owner}/{repo}/commits/{commit_sha}/branches-where-head",
                        { mediaType: { previews: ["groot"] } },
                    ],
                    listCollaborators: [
                        "GET /repos/{owner}/{repo}/collaborators",
                    ],
                    listCommentsForCommit: [
                        "GET /repos/{owner}/{repo}/commits/{commit_sha}/comments",
                    ],
                    listCommitCommentsForRepo: [
                        "GET /repos/{owner}/{repo}/comments",
                    ],
                    listCommitStatusesForRef: [
                        "GET /repos/{owner}/{repo}/commits/{ref}/statuses",
                    ],
                    listCommits: ["GET /repos/{owner}/{repo}/commits"],
                    listContributors: [
                        "GET /repos/{owner}/{repo}/contributors",
                    ],
                    listDeployKeys: ["GET /repos/{owner}/{repo}/keys"],
                    listDeploymentStatuses: [
                        "GET /repos/{owner}/{repo}/deployments/{deployment_id}/statuses",
                    ],
                    listDeployments: ["GET /repos/{owner}/{repo}/deployments"],
                    listForAuthenticatedUser: ["GET /user/repos"],
                    listForOrg: ["GET /orgs/{org}/repos"],
                    listForUser: ["GET /users/{username}/repos"],
                    listForks: ["GET /repos/{owner}/{repo}/forks"],
                    listInvitations: ["GET /repos/{owner}/{repo}/invitations"],
                    listInvitationsForAuthenticatedUser: [
                        "GET /user/repository_invitations",
                    ],
                    listLanguages: ["GET /repos/{owner}/{repo}/languages"],
                    listPagesBuilds: ["GET /repos/{owner}/{repo}/pages/builds"],
                    listPublic: ["GET /repositories"],
                    listPullRequestsAssociatedWithCommit: [
                        "GET /repos/{owner}/{repo}/commits/{commit_sha}/pulls",
                        { mediaType: { previews: ["groot"] } },
                    ],
                    listReleaseAssets: [
                        "GET /repos/{owner}/{repo}/releases/{release_id}/assets",
                    ],
                    listReleases: ["GET /repos/{owner}/{repo}/releases"],
                    listTags: ["GET /repos/{owner}/{repo}/tags"],
                    listTeams: ["GET /repos/{owner}/{repo}/teams"],
                    listWebhooks: ["GET /repos/{owner}/{repo}/hooks"],
                    merge: ["POST /repos/{owner}/{repo}/merges"],
                    pingWebhook: [
                        "POST /repos/{owner}/{repo}/hooks/{hook_id}/pings",
                    ],
                    removeAppAccessRestrictions: [
                        "DELETE /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/apps",
                        {},
                        { mapToData: "apps" },
                    ],
                    removeCollaborator: [
                        "DELETE /repos/{owner}/{repo}/collaborators/{username}",
                    ],
                    removeStatusCheckContexts: [
                        "DELETE /repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks/contexts",
                        {},
                        { mapToData: "contexts" },
                    ],
                    removeStatusCheckProtection: [
                        "DELETE /repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks",
                    ],
                    removeTeamAccessRestrictions: [
                        "DELETE /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/teams",
                        {},
                        { mapToData: "teams" },
                    ],
                    removeUserAccessRestrictions: [
                        "DELETE /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/users",
                        {},
                        { mapToData: "users" },
                    ],
                    replaceAllTopics: [
                        "PUT /repos/{owner}/{repo}/topics",
                        { mediaType: { previews: ["mercy"] } },
                    ],
                    requestPagesBuild: [
                        "POST /repos/{owner}/{repo}/pages/builds",
                    ],
                    setAdminBranchProtection: [
                        "POST /repos/{owner}/{repo}/branches/{branch}/protection/enforce_admins",
                    ],
                    setAppAccessRestrictions: [
                        "PUT /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/apps",
                        {},
                        { mapToData: "apps" },
                    ],
                    setStatusCheckContexts: [
                        "PUT /repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks/contexts",
                        {},
                        { mapToData: "contexts" },
                    ],
                    setTeamAccessRestrictions: [
                        "PUT /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/teams",
                        {},
                        { mapToData: "teams" },
                    ],
                    setUserAccessRestrictions: [
                        "PUT /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/users",
                        {},
                        { mapToData: "users" },
                    ],
                    testPushWebhook: [
                        "POST /repos/{owner}/{repo}/hooks/{hook_id}/tests",
                    ],
                    transfer: ["POST /repos/{owner}/{repo}/transfer"],
                    update: ["PATCH /repos/{owner}/{repo}"],
                    updateBranchProtection: [
                        "PUT /repos/{owner}/{repo}/branches/{branch}/protection",
                    ],
                    updateCommitComment: [
                        "PATCH /repos/{owner}/{repo}/comments/{comment_id}",
                    ],
                    updateInformationAboutPagesSite: [
                        "PUT /repos/{owner}/{repo}/pages",
                    ],
                    updateInvitation: [
                        "PATCH /repos/{owner}/{repo}/invitations/{invitation_id}",
                    ],
                    updatePullRequestReviewProtection: [
                        "PATCH /repos/{owner}/{repo}/branches/{branch}/protection/required_pull_request_reviews",
                    ],
                    updateRelease: [
                        "PATCH /repos/{owner}/{repo}/releases/{release_id}",
                    ],
                    updateReleaseAsset: [
                        "PATCH /repos/{owner}/{repo}/releases/assets/{asset_id}",
                    ],
                    updateStatusCheckPotection: [
                        "PATCH /repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks",
                        {},
                        { renamed: ["repos", "updateStatusCheckProtection"] },
                    ],
                    updateStatusCheckProtection: [
                        "PATCH /repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks",
                    ],
                    updateWebhook: [
                        "PATCH /repos/{owner}/{repo}/hooks/{hook_id}",
                    ],
                    updateWebhookConfigForRepo: [
                        "PATCH /repos/{owner}/{repo}/hooks/{hook_id}/config",
                    ],
                    uploadReleaseAsset: [
                        "POST /repos/{owner}/{repo}/releases/{release_id}/assets{?name,label}",
                        { baseUrl: "https://uploads.github.com" },
                    ],
                },
                search: {
                    code: ["GET /search/code"],
                    commits: [
                        "GET /search/commits",
                        { mediaType: { previews: ["cloak"] } },
                    ],
                    issuesAndPullRequests: ["GET /search/issues"],
                    labels: ["GET /search/labels"],
                    repos: ["GET /search/repositories"],
                    topics: [
                        "GET /search/topics",
                        { mediaType: { previews: ["mercy"] } },
                    ],
                    users: ["GET /search/users"],
                },
                secretScanning: {
                    getAlert: [
                        "GET /repos/{owner}/{repo}/secret-scanning/alerts/{alert_number}",
                    ],
                    listAlertsForRepo: [
                        "GET /repos/{owner}/{repo}/secret-scanning/alerts",
                    ],
                    updateAlert: [
                        "PATCH /repos/{owner}/{repo}/secret-scanning/alerts/{alert_number}",
                    ],
                },
                teams: {
                    addOrUpdateMembershipForUserInOrg: [
                        "PUT /orgs/{org}/teams/{team_slug}/memberships/{username}",
                    ],
                    addOrUpdateProjectPermissionsInOrg: [
                        "PUT /orgs/{org}/teams/{team_slug}/projects/{project_id}",
                        { mediaType: { previews: ["inertia"] } },
                    ],
                    addOrUpdateRepoPermissionsInOrg: [
                        "PUT /orgs/{org}/teams/{team_slug}/repos/{owner}/{repo}",
                    ],
                    checkPermissionsForProjectInOrg: [
                        "GET /orgs/{org}/teams/{team_slug}/projects/{project_id}",
                        { mediaType: { previews: ["inertia"] } },
                    ],
                    checkPermissionsForRepoInOrg: [
                        "GET /orgs/{org}/teams/{team_slug}/repos/{owner}/{repo}",
                    ],
                    create: ["POST /orgs/{org}/teams"],
                    createDiscussionCommentInOrg: [
                        "POST /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments",
                    ],
                    createDiscussionInOrg: [
                        "POST /orgs/{org}/teams/{team_slug}/discussions",
                    ],
                    deleteDiscussionCommentInOrg: [
                        "DELETE /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments/{comment_number}",
                    ],
                    deleteDiscussionInOrg: [
                        "DELETE /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}",
                    ],
                    deleteInOrg: ["DELETE /orgs/{org}/teams/{team_slug}"],
                    getByName: ["GET /orgs/{org}/teams/{team_slug}"],
                    getDiscussionCommentInOrg: [
                        "GET /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments/{comment_number}",
                    ],
                    getDiscussionInOrg: [
                        "GET /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}",
                    ],
                    getMembershipForUserInOrg: [
                        "GET /orgs/{org}/teams/{team_slug}/memberships/{username}",
                    ],
                    list: ["GET /orgs/{org}/teams"],
                    listChildInOrg: ["GET /orgs/{org}/teams/{team_slug}/teams"],
                    listDiscussionCommentsInOrg: [
                        "GET /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments",
                    ],
                    listDiscussionsInOrg: [
                        "GET /orgs/{org}/teams/{team_slug}/discussions",
                    ],
                    listForAuthenticatedUser: ["GET /user/teams"],
                    listMembersInOrg: [
                        "GET /orgs/{org}/teams/{team_slug}/members",
                    ],
                    listPendingInvitationsInOrg: [
                        "GET /orgs/{org}/teams/{team_slug}/invitations",
                    ],
                    listProjectsInOrg: [
                        "GET /orgs/{org}/teams/{team_slug}/projects",
                        { mediaType: { previews: ["inertia"] } },
                    ],
                    listReposInOrg: ["GET /orgs/{org}/teams/{team_slug}/repos"],
                    removeMembershipForUserInOrg: [
                        "DELETE /orgs/{org}/teams/{team_slug}/memberships/{username}",
                    ],
                    removeProjectInOrg: [
                        "DELETE /orgs/{org}/teams/{team_slug}/projects/{project_id}",
                    ],
                    removeRepoInOrg: [
                        "DELETE /orgs/{org}/teams/{team_slug}/repos/{owner}/{repo}",
                    ],
                    updateDiscussionCommentInOrg: [
                        "PATCH /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments/{comment_number}",
                    ],
                    updateDiscussionInOrg: [
                        "PATCH /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}",
                    ],
                    updateInOrg: ["PATCH /orgs/{org}/teams/{team_slug}"],
                },
                users: {
                    addEmailForAuthenticated: ["POST /user/emails"],
                    block: ["PUT /user/blocks/{username}"],
                    checkBlocked: ["GET /user/blocks/{username}"],
                    checkFollowingForUser: [
                        "GET /users/{username}/following/{target_user}",
                    ],
                    checkPersonIsFollowedByAuthenticated: [
                        "GET /user/following/{username}",
                    ],
                    createGpgKeyForAuthenticated: ["POST /user/gpg_keys"],
                    createPublicSshKeyForAuthenticated: ["POST /user/keys"],
                    deleteEmailForAuthenticated: ["DELETE /user/emails"],
                    deleteGpgKeyForAuthenticated: [
                        "DELETE /user/gpg_keys/{gpg_key_id}",
                    ],
                    deletePublicSshKeyForAuthenticated: [
                        "DELETE /user/keys/{key_id}",
                    ],
                    follow: ["PUT /user/following/{username}"],
                    getAuthenticated: ["GET /user"],
                    getByUsername: ["GET /users/{username}"],
                    getContextForUser: ["GET /users/{username}/hovercard"],
                    getGpgKeyForAuthenticated: [
                        "GET /user/gpg_keys/{gpg_key_id}",
                    ],
                    getPublicSshKeyForAuthenticated: [
                        "GET /user/keys/{key_id}",
                    ],
                    list: ["GET /users"],
                    listBlockedByAuthenticated: ["GET /user/blocks"],
                    listEmailsForAuthenticated: ["GET /user/emails"],
                    listFollowedByAuthenticated: ["GET /user/following"],
                    listFollowersForAuthenticatedUser: ["GET /user/followers"],
                    listFollowersForUser: ["GET /users/{username}/followers"],
                    listFollowingForUser: ["GET /users/{username}/following"],
                    listGpgKeysForAuthenticated: ["GET /user/gpg_keys"],
                    listGpgKeysForUser: ["GET /users/{username}/gpg_keys"],
                    listPublicEmailsForAuthenticated: [
                        "GET /user/public_emails",
                    ],
                    listPublicKeysForUser: ["GET /users/{username}/keys"],
                    listPublicSshKeysForAuthenticated: ["GET /user/keys"],
                    setPrimaryEmailVisibilityForAuthenticated: [
                        "PATCH /user/email/visibility",
                    ],
                    unblock: ["DELETE /user/blocks/{username}"],
                    unfollow: ["DELETE /user/following/{username}"],
                    updateAuthenticated: ["PATCH /user"],
                },
            };
            const s = "4.4.1";
            function endpointsToMethods(e, t) {
                const r = {};
                for (const [s, o] of Object.entries(t)) {
                    for (const [t, n] of Object.entries(o)) {
                        const [o, i, c] = n;
                        const [a, u] = o.split(/ /);
                        const l = Object.assign({ method: a, url: u }, i);
                        if (!r[s]) {
                            r[s] = {};
                        }
                        const p = r[s];
                        if (c) {
                            p[t] = decorate(e, s, t, l, c);
                            continue;
                        }
                        p[t] = e.request.defaults(l);
                    }
                }
                return r;
            }
            function decorate(e, t, r, s, o) {
                const n = e.request.defaults(s);
                function withDecorations(...s) {
                    let i = n.endpoint.merge(...s);
                    if (o.mapToData) {
                        i = Object.assign({}, i, {
                            data: i[o.mapToData],
                            [o.mapToData]: undefined,
                        });
                        return n(i);
                    }
                    if (o.renamed) {
                        const [s, n] = o.renamed;
                        e.log.warn(
                            `octokit.${t}.${r}() has been renamed to octokit.${s}.${n}()`
                        );
                    }
                    if (o.deprecated) {
                        e.log.warn(o.deprecated);
                    }
                    if (o.renamedParameters) {
                        const i = n.endpoint.merge(...s);
                        for (const [s, n] of Object.entries(
                            o.renamedParameters
                        )) {
                            if (s in i) {
                                e.log.warn(
                                    `"${s}" parameter is deprecated for "octokit.${t}.${r}()". Use "${n}" instead`
                                );
                                if (!(n in i)) {
                                    i[n] = i[s];
                                }
                                delete i[s];
                            }
                        }
                        return n(i);
                    }
                    return n(...s);
                }
                return Object.assign(withDecorations, n);
            }
            function restEndpointMethods(e) {
                return endpointsToMethods(e, r);
            }
            restEndpointMethods.VERSION = s;
            t.restEndpointMethods = restEndpointMethods;
        },
        537: (e, t, r) => {
            "use strict";
            Object.defineProperty(t, "__esModule", { value: true });
            function _interopDefault(e) {
                return e && typeof e === "object" && "default" in e
                    ? e["default"]
                    : e;
            }
            var s = r(481);
            var o = _interopDefault(r(223));
            const n = o((e) => console.warn(e));
            class RequestError extends Error {
                constructor(e, t, r) {
                    super(e);
                    if (Error.captureStackTrace) {
                        Error.captureStackTrace(this, this.constructor);
                    }
                    this.name = "HttpError";
                    this.status = t;
                    Object.defineProperty(this, "code", {
                        get() {
                            n(
                                new s.Deprecation(
                                    "[@octokit/request-error] `error.code` is deprecated, use `error.status`."
                                )
                            );
                            return t;
                        },
                    });
                    this.headers = r.headers || {};
                    const o = Object.assign({}, r.request);
                    if (r.request.headers.authorization) {
                        o.headers = Object.assign({}, r.request.headers, {
                            authorization: r.request.headers.authorization.replace(
                                / .*$/,
                                " [REDACTED]"
                            ),
                        });
                    }
                    o.url = o.url
                        .replace(
                            /\bclient_secret=\w+/g,
                            "client_secret=[REDACTED]"
                        )
                        .replace(
                            /\baccess_token=\w+/g,
                            "access_token=[REDACTED]"
                        );
                    this.request = o;
                }
            }
            t.RequestError = RequestError;
        },
        234: (e, t, r) => {
            "use strict";
            Object.defineProperty(t, "__esModule", { value: true });
            function _interopDefault(e) {
                return e && typeof e === "object" && "default" in e
                    ? e["default"]
                    : e;
            }
            var s = r(440);
            var o = r(429);
            var n = r(287);
            var i = _interopDefault(r(467));
            var c = r(537);
            const a = "5.4.12";
            function getBufferResponse(e) {
                return e.arrayBuffer();
            }
            function fetchWrapper(e) {
                if (n.isPlainObject(e.body) || Array.isArray(e.body)) {
                    e.body = JSON.stringify(e.body);
                }
                let t = {};
                let r;
                let s;
                const o = (e.request && e.request.fetch) || i;
                return o(
                    e.url,
                    Object.assign(
                        {
                            method: e.method,
                            body: e.body,
                            headers: e.headers,
                            redirect: e.redirect,
                        },
                        e.request
                    )
                )
                    .then((o) => {
                        s = o.url;
                        r = o.status;
                        for (const e of o.headers) {
                            t[e[0]] = e[1];
                        }
                        if (r === 204 || r === 205) {
                            return;
                        }
                        if (e.method === "HEAD") {
                            if (r < 400) {
                                return;
                            }
                            throw new c.RequestError(o.statusText, r, {
                                headers: t,
                                request: e,
                            });
                        }
                        if (r === 304) {
                            throw new c.RequestError("Not modified", r, {
                                headers: t,
                                request: e,
                            });
                        }
                        if (r >= 400) {
                            return o.text().then((s) => {
                                const o = new c.RequestError(s, r, {
                                    headers: t,
                                    request: e,
                                });
                                try {
                                    let e = JSON.parse(o.message);
                                    Object.assign(o, e);
                                    let t = e.errors;
                                    o.message =
                                        o.message +
                                        ": " +
                                        t.map(JSON.stringify).join(", ");
                                } catch (e) {}
                                throw o;
                            });
                        }
                        const n = o.headers.get("content-type");
                        if (/application\/json/.test(n)) {
                            return o.json();
                        }
                        if (!n || /^text\/|charset=utf-8$/.test(n)) {
                            return o.text();
                        }
                        return getBufferResponse(o);
                    })
                    .then((e) => {
                        return { status: r, url: s, headers: t, data: e };
                    })
                    .catch((r) => {
                        if (r instanceof c.RequestError) {
                            throw r;
                        }
                        throw new c.RequestError(r.message, 500, {
                            headers: t,
                            request: e,
                        });
                    });
            }
            function withDefaults(e, t) {
                const r = e.defaults(t);
                const s = function (e, t) {
                    const s = r.merge(e, t);
                    if (!s.request || !s.request.hook) {
                        return fetchWrapper(r.parse(s));
                    }
                    const o = (e, t) => {
                        return fetchWrapper(r.parse(r.merge(e, t)));
                    };
                    Object.assign(o, {
                        endpoint: r,
                        defaults: withDefaults.bind(null, r),
                    });
                    return s.request.hook(o, s);
                };
                return Object.assign(s, {
                    endpoint: r,
                    defaults: withDefaults.bind(null, r),
                });
            }
            const u = withDefaults(s.endpoint, {
                headers: {
                    "user-agent": `octokit-request.js/${a} ${o.getUserAgent()}`,
                },
            });
            t.request = u;
        },
        682: (e, t, r) => {
            var s = r(670);
            var o = r(549);
            var n = r(819);
            var i = Function.bind;
            var c = i.bind(i);
            function bindApi(e, t, r) {
                var s = c(n, null).apply(null, r ? [t, r] : [t]);
                e.api = { remove: s };
                e.remove = s;
                ["before", "error", "after", "wrap"].forEach(function (s) {
                    var n = r ? [t, s, r] : [t, s];
                    e[s] = e.api[s] = c(o, null).apply(null, n);
                });
            }
            function HookSingular() {
                var e = "h";
                var t = { registry: {} };
                var r = s.bind(null, t, e);
                bindApi(r, t, e);
                return r;
            }
            function HookCollection() {
                var e = { registry: {} };
                var t = s.bind(null, e);
                bindApi(t, e);
                return t;
            }
            var a = false;
            function Hook() {
                if (!a) {
                    console.warn(
                        '[before-after-hook]: "Hook()" repurposing warning, use "Hook.Collection()". Read more: https://git.io/upgrade-before-after-hook-to-1.4'
                    );
                    a = true;
                }
                return HookCollection();
            }
            Hook.Singular = HookSingular.bind();
            Hook.Collection = HookCollection.bind();
            e.exports = Hook;
            e.exports.Hook = Hook;
            e.exports.Singular = Hook.Singular;
            e.exports.Collection = Hook.Collection;
        },
        549: (e) => {
            e.exports = addHook;
            function addHook(e, t, r, s) {
                var o = s;
                if (!e.registry[r]) {
                    e.registry[r] = [];
                }
                if (t === "before") {
                    s = function (e, t) {
                        return Promise.resolve()
                            .then(o.bind(null, t))
                            .then(e.bind(null, t));
                    };
                }
                if (t === "after") {
                    s = function (e, t) {
                        var r;
                        return Promise.resolve()
                            .then(e.bind(null, t))
                            .then(function (e) {
                                r = e;
                                return o(r, t);
                            })
                            .then(function () {
                                return r;
                            });
                    };
                }
                if (t === "error") {
                    s = function (e, t) {
                        return Promise.resolve()
                            .then(e.bind(null, t))
                            .catch(function (e) {
                                return o(e, t);
                            });
                    };
                }
                e.registry[r].push({ hook: s, orig: o });
            }
        },
        670: (e) => {
            e.exports = register;
            function register(e, t, r, s) {
                if (typeof r !== "function") {
                    throw new Error(
                        "method for before hook must be a function"
                    );
                }
                if (!s) {
                    s = {};
                }
                if (Array.isArray(t)) {
                    return t.reverse().reduce(function (t, r) {
                        return register.bind(null, e, r, t, s);
                    }, r)();
                }
                return Promise.resolve().then(function () {
                    if (!e.registry[t]) {
                        return r(s);
                    }
                    return e.registry[t].reduce(function (e, t) {
                        return t.hook.bind(null, e, s);
                    }, r)();
                });
            }
        },
        819: (e) => {
            e.exports = removeHook;
            function removeHook(e, t, r) {
                if (!e.registry[t]) {
                    return;
                }
                var s = e.registry[t]
                    .map(function (e) {
                        return e.orig;
                    })
                    .indexOf(r);
                if (s === -1) {
                    return;
                }
                e.registry[t].splice(s, 1);
            }
        },
        481: (e, t) => {
            "use strict";
            Object.defineProperty(t, "__esModule", { value: true });
            class Deprecation extends Error {
                constructor(e) {
                    super(e);
                    if (Error.captureStackTrace) {
                        Error.captureStackTrace(this, this.constructor);
                    }
                    this.name = "Deprecation";
                }
            }
            t.Deprecation = Deprecation;
        },
        287: (e, t) => {
            "use strict";
            Object.defineProperty(t, "__esModule", { value: true });
            function isObject(e) {
                return Object.prototype.toString.call(e) === "[object Object]";
            }
            function isPlainObject(e) {
                var t, r;
                if (isObject(e) === false) return false;
                t = e.constructor;
                if (t === undefined) return true;
                r = t.prototype;
                if (isObject(r) === false) return false;
                if (r.hasOwnProperty("isPrototypeOf") === false) {
                    return false;
                }
                return true;
            }
            t.isPlainObject = isPlainObject;
        },
        467: (e, t, r) => {
            "use strict";
            Object.defineProperty(t, "__esModule", { value: true });
            function _interopDefault(e) {
                return e && typeof e === "object" && "default" in e
                    ? e["default"]
                    : e;
            }
            var s = _interopDefault(r(413));
            var o = _interopDefault(r(605));
            var n = _interopDefault(r(835));
            var i = _interopDefault(r(211));
            var c = _interopDefault(r(761));
            const a = s.Readable;
            const u = Symbol("buffer");
            const l = Symbol("type");
            class Blob {
                constructor() {
                    this[l] = "";
                    const e = arguments[0];
                    const t = arguments[1];
                    const r = [];
                    let s = 0;
                    if (e) {
                        const t = e;
                        const o = Number(t.length);
                        for (let e = 0; e < o; e++) {
                            const o = t[e];
                            let n;
                            if (o instanceof Buffer) {
                                n = o;
                            } else if (ArrayBuffer.isView(o)) {
                                n = Buffer.from(
                                    o.buffer,
                                    o.byteOffset,
                                    o.byteLength
                                );
                            } else if (o instanceof ArrayBuffer) {
                                n = Buffer.from(o);
                            } else if (o instanceof Blob) {
                                n = o[u];
                            } else {
                                n = Buffer.from(
                                    typeof o === "string" ? o : String(o)
                                );
                            }
                            s += n.length;
                            r.push(n);
                        }
                    }
                    this[u] = Buffer.concat(r);
                    let o =
                        t &&
                        t.type !== undefined &&
                        String(t.type).toLowerCase();
                    if (o && !/[^\u0020-\u007E]/.test(o)) {
                        this[l] = o;
                    }
                }
                get size() {
                    return this[u].length;
                }
                get type() {
                    return this[l];
                }
                text() {
                    return Promise.resolve(this[u].toString());
                }
                arrayBuffer() {
                    const e = this[u];
                    const t = e.buffer.slice(
                        e.byteOffset,
                        e.byteOffset + e.byteLength
                    );
                    return Promise.resolve(t);
                }
                stream() {
                    const e = new a();
                    e._read = function () {};
                    e.push(this[u]);
                    e.push(null);
                    return e;
                }
                toString() {
                    return "[object Blob]";
                }
                slice() {
                    const e = this.size;
                    const t = arguments[0];
                    const r = arguments[1];
                    let s, o;
                    if (t === undefined) {
                        s = 0;
                    } else if (t < 0) {
                        s = Math.max(e + t, 0);
                    } else {
                        s = Math.min(t, e);
                    }
                    if (r === undefined) {
                        o = e;
                    } else if (r < 0) {
                        o = Math.max(e + r, 0);
                    } else {
                        o = Math.min(r, e);
                    }
                    const n = Math.max(o - s, 0);
                    const i = this[u];
                    const c = i.slice(s, s + n);
                    const a = new Blob([], { type: arguments[2] });
                    a[u] = c;
                    return a;
                }
            }
            Object.defineProperties(Blob.prototype, {
                size: { enumerable: true },
                type: { enumerable: true },
                slice: { enumerable: true },
            });
            Object.defineProperty(Blob.prototype, Symbol.toStringTag, {
                value: "Blob",
                writable: false,
                enumerable: false,
                configurable: true,
            });
            function FetchError(e, t, r) {
                Error.call(this, e);
                this.message = e;
                this.type = t;
                if (r) {
                    this.code = this.errno = r.code;
                }
                Error.captureStackTrace(this, this.constructor);
            }
            FetchError.prototype = Object.create(Error.prototype);
            FetchError.prototype.constructor = FetchError;
            FetchError.prototype.name = "FetchError";
            let p;
            try {
                p = r(877).convert;
            } catch (e) {}
            const d = Symbol("Body internals");
            const m = s.PassThrough;
            function Body(e) {
                var t = this;
                var r =
                        arguments.length > 1 && arguments[1] !== undefined
                            ? arguments[1]
                            : {},
                    o = r.size;
                let n = o === undefined ? 0 : o;
                var i = r.timeout;
                let c = i === undefined ? 0 : i;
                if (e == null) {
                    e = null;
                } else if (isURLSearchParams(e)) {
                    e = Buffer.from(e.toString());
                } else if (isBlob(e));
                else if (Buffer.isBuffer(e));
                else if (
                    Object.prototype.toString.call(e) === "[object ArrayBuffer]"
                ) {
                    e = Buffer.from(e);
                } else if (ArrayBuffer.isView(e)) {
                    e = Buffer.from(e.buffer, e.byteOffset, e.byteLength);
                } else if (e instanceof s);
                else {
                    e = Buffer.from(String(e));
                }
                this[d] = { body: e, disturbed: false, error: null };
                this.size = n;
                this.timeout = c;
                if (e instanceof s) {
                    e.on("error", function (e) {
                        const r =
                            e.name === "AbortError"
                                ? e
                                : new FetchError(
                                      `Invalid response body while trying to fetch ${t.url}: ${e.message}`,
                                      "system",
                                      e
                                  );
                        t[d].error = r;
                    });
                }
            }
            Body.prototype = {
                get body() {
                    return this[d].body;
                },
                get bodyUsed() {
                    return this[d].disturbed;
                },
                arrayBuffer() {
                    return consumeBody.call(this).then(function (e) {
                        return e.buffer.slice(
                            e.byteOffset,
                            e.byteOffset + e.byteLength
                        );
                    });
                },
                blob() {
                    let e =
                        (this.headers && this.headers.get("content-type")) ||
                        "";
                    return consumeBody.call(this).then(function (t) {
                        return Object.assign(
                            new Blob([], { type: e.toLowerCase() }),
                            { [u]: t }
                        );
                    });
                },
                json() {
                    var e = this;
                    return consumeBody.call(this).then(function (t) {
                        try {
                            return JSON.parse(t.toString());
                        } catch (t) {
                            return Body.Promise.reject(
                                new FetchError(
                                    `invalid json response body at ${e.url} reason: ${t.message}`,
                                    "invalid-json"
                                )
                            );
                        }
                    });
                },
                text() {
                    return consumeBody.call(this).then(function (e) {
                        return e.toString();
                    });
                },
                buffer() {
                    return consumeBody.call(this);
                },
                textConverted() {
                    var e = this;
                    return consumeBody.call(this).then(function (t) {
                        return convertBody(t, e.headers);
                    });
                },
            };
            Object.defineProperties(Body.prototype, {
                body: { enumerable: true },
                bodyUsed: { enumerable: true },
                arrayBuffer: { enumerable: true },
                blob: { enumerable: true },
                json: { enumerable: true },
                text: { enumerable: true },
            });
            Body.mixIn = function (e) {
                for (const t of Object.getOwnPropertyNames(Body.prototype)) {
                    if (!(t in e)) {
                        const r = Object.getOwnPropertyDescriptor(
                            Body.prototype,
                            t
                        );
                        Object.defineProperty(e, t, r);
                    }
                }
            };
            function consumeBody() {
                var e = this;
                if (this[d].disturbed) {
                    return Body.Promise.reject(
                        new TypeError(`body used already for: ${this.url}`)
                    );
                }
                this[d].disturbed = true;
                if (this[d].error) {
                    return Body.Promise.reject(this[d].error);
                }
                let t = this.body;
                if (t === null) {
                    return Body.Promise.resolve(Buffer.alloc(0));
                }
                if (isBlob(t)) {
                    t = t.stream();
                }
                if (Buffer.isBuffer(t)) {
                    return Body.Promise.resolve(t);
                }
                if (!(t instanceof s)) {
                    return Body.Promise.resolve(Buffer.alloc(0));
                }
                let r = [];
                let o = 0;
                let n = false;
                return new Body.Promise(function (s, i) {
                    let c;
                    if (e.timeout) {
                        c = setTimeout(function () {
                            n = true;
                            i(
                                new FetchError(
                                    `Response timeout while trying to fetch ${e.url} (over ${e.timeout}ms)`,
                                    "body-timeout"
                                )
                            );
                        }, e.timeout);
                    }
                    t.on("error", function (t) {
                        if (t.name === "AbortError") {
                            n = true;
                            i(t);
                        } else {
                            i(
                                new FetchError(
                                    `Invalid response body while trying to fetch ${e.url}: ${t.message}`,
                                    "system",
                                    t
                                )
                            );
                        }
                    });
                    t.on("data", function (t) {
                        if (n || t === null) {
                            return;
                        }
                        if (e.size && o + t.length > e.size) {
                            n = true;
                            i(
                                new FetchError(
                                    `content size at ${e.url} over limit: ${e.size}`,
                                    "max-size"
                                )
                            );
                            return;
                        }
                        o += t.length;
                        r.push(t);
                    });
                    t.on("end", function () {
                        if (n) {
                            return;
                        }
                        clearTimeout(c);
                        try {
                            s(Buffer.concat(r, o));
                        } catch (t) {
                            i(
                                new FetchError(
                                    `Could not create Buffer from response body for ${e.url}: ${t.message}`,
                                    "system",
                                    t
                                )
                            );
                        }
                    });
                });
            }
            function convertBody(e, t) {
                if (typeof p !== "function") {
                    throw new Error(
                        "The package `encoding` must be installed to use the textConverted() function"
                    );
                }
                const r = t.get("content-type");
                let s = "utf-8";
                let o, n;
                if (r) {
                    o = /charset=([^;]*)/i.exec(r);
                }
                n = e.slice(0, 1024).toString();
                if (!o && n) {
                    o = /<meta.+?charset=(['"])(.+?)\1/i.exec(n);
                }
                if (!o && n) {
                    o = /<meta[\s]+?http-equiv=(['"])content-type\1[\s]+?content=(['"])(.+?)\2/i.exec(
                        n
                    );
                    if (!o) {
                        o = /<meta[\s]+?content=(['"])(.+?)\1[\s]+?http-equiv=(['"])content-type\3/i.exec(
                            n
                        );
                        if (o) {
                            o.pop();
                        }
                    }
                    if (o) {
                        o = /charset=(.*)/i.exec(o.pop());
                    }
                }
                if (!o && n) {
                    o = /<\?xml.+?encoding=(['"])(.+?)\1/i.exec(n);
                }
                if (o) {
                    s = o.pop();
                    if (s === "gb2312" || s === "gbk") {
                        s = "gb18030";
                    }
                }
                return p(e, "UTF-8", s).toString();
            }
            function isURLSearchParams(e) {
                if (
                    typeof e !== "object" ||
                    typeof e.append !== "function" ||
                    typeof e.delete !== "function" ||
                    typeof e.get !== "function" ||
                    typeof e.getAll !== "function" ||
                    typeof e.has !== "function" ||
                    typeof e.set !== "function"
                ) {
                    return false;
                }
                return (
                    e.constructor.name === "URLSearchParams" ||
                    Object.prototype.toString.call(e) ===
                        "[object URLSearchParams]" ||
                    typeof e.sort === "function"
                );
            }
            function isBlob(e) {
                return (
                    typeof e === "object" &&
                    typeof e.arrayBuffer === "function" &&
                    typeof e.type === "string" &&
                    typeof e.stream === "function" &&
                    typeof e.constructor === "function" &&
                    typeof e.constructor.name === "string" &&
                    /^(Blob|File)$/.test(e.constructor.name) &&
                    /^(Blob|File)$/.test(e[Symbol.toStringTag])
                );
            }
            function clone(e) {
                let t, r;
                let o = e.body;
                if (e.bodyUsed) {
                    throw new Error("cannot clone body after it is used");
                }
                if (o instanceof s && typeof o.getBoundary !== "function") {
                    t = new m();
                    r = new m();
                    o.pipe(t);
                    o.pipe(r);
                    e[d].body = t;
                    o = r;
                }
                return o;
            }
            function extractContentType(e) {
                if (e === null) {
                    return null;
                } else if (typeof e === "string") {
                    return "text/plain;charset=UTF-8";
                } else if (isURLSearchParams(e)) {
                    return "application/x-www-form-urlencoded;charset=UTF-8";
                } else if (isBlob(e)) {
                    return e.type || null;
                } else if (Buffer.isBuffer(e)) {
                    return null;
                } else if (
                    Object.prototype.toString.call(e) === "[object ArrayBuffer]"
                ) {
                    return null;
                } else if (ArrayBuffer.isView(e)) {
                    return null;
                } else if (typeof e.getBoundary === "function") {
                    return `multipart/form-data;boundary=${e.getBoundary()}`;
                } else if (e instanceof s) {
                    return null;
                } else {
                    return "text/plain;charset=UTF-8";
                }
            }
            function getTotalBytes(e) {
                const t = e.body;
                if (t === null) {
                    return 0;
                } else if (isBlob(t)) {
                    return t.size;
                } else if (Buffer.isBuffer(t)) {
                    return t.length;
                } else if (t && typeof t.getLengthSync === "function") {
                    if (
                        (t._lengthRetrievers &&
                            t._lengthRetrievers.length == 0) ||
                        (t.hasKnownLength && t.hasKnownLength())
                    ) {
                        return t.getLengthSync();
                    }
                    return null;
                } else {
                    return null;
                }
            }
            function writeToStream(e, t) {
                const r = t.body;
                if (r === null) {
                    e.end();
                } else if (isBlob(r)) {
                    r.stream().pipe(e);
                } else if (Buffer.isBuffer(r)) {
                    e.write(r);
                    e.end();
                } else {
                    r.pipe(e);
                }
            }
            Body.Promise = global.Promise;
            const g = /[^\^_`a-zA-Z\-0-9!#$%&'*+.|~]/;
            const f = /[^\t\x20-\x7e\x80-\xff]/;
            function validateName(e) {
                e = `${e}`;
                if (g.test(e) || e === "") {
                    throw new TypeError(`${e} is not a legal HTTP header name`);
                }
            }
            function validateValue(e) {
                e = `${e}`;
                if (f.test(e)) {
                    throw new TypeError(
                        `${e} is not a legal HTTP header value`
                    );
                }
            }
            function find(e, t) {
                t = t.toLowerCase();
                for (const r in e) {
                    if (r.toLowerCase() === t) {
                        return r;
                    }
                }
                return undefined;
            }
            const h = Symbol("map");
            class Headers {
                constructor() {
                    let e =
                        arguments.length > 0 && arguments[0] !== undefined
                            ? arguments[0]
                            : undefined;
                    this[h] = Object.create(null);
                    if (e instanceof Headers) {
                        const t = e.raw();
                        const r = Object.keys(t);
                        for (const e of r) {
                            for (const r of t[e]) {
                                this.append(e, r);
                            }
                        }
                        return;
                    }
                    if (e == null);
                    else if (typeof e === "object") {
                        const t = e[Symbol.iterator];
                        if (t != null) {
                            if (typeof t !== "function") {
                                throw new TypeError(
                                    "Header pairs must be iterable"
                                );
                            }
                            const r = [];
                            for (const t of e) {
                                if (
                                    typeof t !== "object" ||
                                    typeof t[Symbol.iterator] !== "function"
                                ) {
                                    throw new TypeError(
                                        "Each header pair must be iterable"
                                    );
                                }
                                r.push(Array.from(t));
                            }
                            for (const e of r) {
                                if (e.length !== 2) {
                                    throw new TypeError(
                                        "Each header pair must be a name/value tuple"
                                    );
                                }
                                this.append(e[0], e[1]);
                            }
                        } else {
                            for (const t of Object.keys(e)) {
                                const r = e[t];
                                this.append(t, r);
                            }
                        }
                    } else {
                        throw new TypeError(
                            "Provided initializer must be an object"
                        );
                    }
                }
                get(e) {
                    e = `${e}`;
                    validateName(e);
                    const t = find(this[h], e);
                    if (t === undefined) {
                        return null;
                    }
                    return this[h][t].join(", ");
                }
                forEach(e) {
                    let t =
                        arguments.length > 1 && arguments[1] !== undefined
                            ? arguments[1]
                            : undefined;
                    let r = getHeaders(this);
                    let s = 0;
                    while (s < r.length) {
                        var o = r[s];
                        const n = o[0],
                            i = o[1];
                        e.call(t, i, n, this);
                        r = getHeaders(this);
                        s++;
                    }
                }
                set(e, t) {
                    e = `${e}`;
                    t = `${t}`;
                    validateName(e);
                    validateValue(t);
                    const r = find(this[h], e);
                    this[h][r !== undefined ? r : e] = [t];
                }
                append(e, t) {
                    e = `${e}`;
                    t = `${t}`;
                    validateName(e);
                    validateValue(t);
                    const r = find(this[h], e);
                    if (r !== undefined) {
                        this[h][r].push(t);
                    } else {
                        this[h][e] = [t];
                    }
                }
                has(e) {
                    e = `${e}`;
                    validateName(e);
                    return find(this[h], e) !== undefined;
                }
                delete(e) {
                    e = `${e}`;
                    validateName(e);
                    const t = find(this[h], e);
                    if (t !== undefined) {
                        delete this[h][t];
                    }
                }
                raw() {
                    return this[h];
                }
                keys() {
                    return createHeadersIterator(this, "key");
                }
                values() {
                    return createHeadersIterator(this, "value");
                }
                [Symbol.iterator]() {
                    return createHeadersIterator(this, "key+value");
                }
            }
            Headers.prototype.entries = Headers.prototype[Symbol.iterator];
            Object.defineProperty(Headers.prototype, Symbol.toStringTag, {
                value: "Headers",
                writable: false,
                enumerable: false,
                configurable: true,
            });
            Object.defineProperties(Headers.prototype, {
                get: { enumerable: true },
                forEach: { enumerable: true },
                set: { enumerable: true },
                append: { enumerable: true },
                has: { enumerable: true },
                delete: { enumerable: true },
                keys: { enumerable: true },
                values: { enumerable: true },
                entries: { enumerable: true },
            });
            function getHeaders(e) {
                let t =
                    arguments.length > 1 && arguments[1] !== undefined
                        ? arguments[1]
                        : "key+value";
                const r = Object.keys(e[h]).sort();
                return r.map(
                    t === "key"
                        ? function (e) {
                              return e.toLowerCase();
                          }
                        : t === "value"
                        ? function (t) {
                              return e[h][t].join(", ");
                          }
                        : function (t) {
                              return [t.toLowerCase(), e[h][t].join(", ")];
                          }
                );
            }
            const T = Symbol("internal");
            function createHeadersIterator(e, t) {
                const r = Object.create(w);
                r[T] = { target: e, kind: t, index: 0 };
                return r;
            }
            const w = Object.setPrototypeOf(
                {
                    next() {
                        if (!this || Object.getPrototypeOf(this) !== w) {
                            throw new TypeError(
                                "Value of `this` is not a HeadersIterator"
                            );
                        }
                        var e = this[T];
                        const t = e.target,
                            r = e.kind,
                            s = e.index;
                        const o = getHeaders(t, r);
                        const n = o.length;
                        if (s >= n) {
                            return { value: undefined, done: true };
                        }
                        this[T].index = s + 1;
                        return { value: o[s], done: false };
                    },
                },
                Object.getPrototypeOf(
                    Object.getPrototypeOf([][Symbol.iterator]())
                )
            );
            Object.defineProperty(w, Symbol.toStringTag, {
                value: "HeadersIterator",
                writable: false,
                enumerable: false,
                configurable: true,
            });
            function exportNodeCompatibleHeaders(e) {
                const t = Object.assign({ __proto__: null }, e[h]);
                const r = find(e[h], "Host");
                if (r !== undefined) {
                    t[r] = t[r][0];
                }
                return t;
            }
            function createHeadersLenient(e) {
                const t = new Headers();
                for (const r of Object.keys(e)) {
                    if (g.test(r)) {
                        continue;
                    }
                    if (Array.isArray(e[r])) {
                        for (const s of e[r]) {
                            if (f.test(s)) {
                                continue;
                            }
                            if (t[h][r] === undefined) {
                                t[h][r] = [s];
                            } else {
                                t[h][r].push(s);
                            }
                        }
                    } else if (!f.test(e[r])) {
                        t[h][r] = [e[r]];
                    }
                }
                return t;
            }
            const b = Symbol("Response internals");
            const E = o.STATUS_CODES;
            class Response {
                constructor() {
                    let e =
                        arguments.length > 0 && arguments[0] !== undefined
                            ? arguments[0]
                            : null;
                    let t =
                        arguments.length > 1 && arguments[1] !== undefined
                            ? arguments[1]
                            : {};
                    Body.call(this, e, t);
                    const r = t.status || 200;
                    const s = new Headers(t.headers);
                    if (e != null && !s.has("Content-Type")) {
                        const t = extractContentType(e);
                        if (t) {
                            s.append("Content-Type", t);
                        }
                    }
                    this[b] = {
                        url: t.url,
                        status: r,
                        statusText: t.statusText || E[r],
                        headers: s,
                        counter: t.counter,
                    };
                }
                get url() {
                    return this[b].url || "";
                }
                get status() {
                    return this[b].status;
                }
                get ok() {
                    return this[b].status >= 200 && this[b].status < 300;
                }
                get redirected() {
                    return this[b].counter > 0;
                }
                get statusText() {
                    return this[b].statusText;
                }
                get headers() {
                    return this[b].headers;
                }
                clone() {
                    return new Response(clone(this), {
                        url: this.url,
                        status: this.status,
                        statusText: this.statusText,
                        headers: this.headers,
                        ok: this.ok,
                        redirected: this.redirected,
                    });
                }
            }
            Body.mixIn(Response.prototype);
            Object.defineProperties(Response.prototype, {
                url: { enumerable: true },
                status: { enumerable: true },
                ok: { enumerable: true },
                redirected: { enumerable: true },
                statusText: { enumerable: true },
                headers: { enumerable: true },
                clone: { enumerable: true },
            });
            Object.defineProperty(Response.prototype, Symbol.toStringTag, {
                value: "Response",
                writable: false,
                enumerable: false,
                configurable: true,
            });
            const y = Symbol("Request internals");
            const _ = n.parse;
            const O = n.format;
            const P = "destroy" in s.Readable.prototype;
            function isRequest(e) {
                return typeof e === "object" && typeof e[y] === "object";
            }
            function isAbortSignal(e) {
                const t =
                    e && typeof e === "object" && Object.getPrototypeOf(e);
                return !!(t && t.constructor.name === "AbortSignal");
            }
            class Request {
                constructor(e) {
                    let t =
                        arguments.length > 1 && arguments[1] !== undefined
                            ? arguments[1]
                            : {};
                    let r;
                    if (!isRequest(e)) {
                        if (e && e.href) {
                            r = _(e.href);
                        } else {
                            r = _(`${e}`);
                        }
                        e = {};
                    } else {
                        r = _(e.url);
                    }
                    let s = t.method || e.method || "GET";
                    s = s.toUpperCase();
                    if (
                        (t.body != null || (isRequest(e) && e.body !== null)) &&
                        (s === "GET" || s === "HEAD")
                    ) {
                        throw new TypeError(
                            "Request with GET/HEAD method cannot have body"
                        );
                    }
                    let o =
                        t.body != null
                            ? t.body
                            : isRequest(e) && e.body !== null
                            ? clone(e)
                            : null;
                    Body.call(this, o, {
                        timeout: t.timeout || e.timeout || 0,
                        size: t.size || e.size || 0,
                    });
                    const n = new Headers(t.headers || e.headers || {});
                    if (o != null && !n.has("Content-Type")) {
                        const e = extractContentType(o);
                        if (e) {
                            n.append("Content-Type", e);
                        }
                    }
                    let i = isRequest(e) ? e.signal : null;
                    if ("signal" in t) i = t.signal;
                    if (i != null && !isAbortSignal(i)) {
                        throw new TypeError(
                            "Expected signal to be an instanceof AbortSignal"
                        );
                    }
                    this[y] = {
                        method: s,
                        redirect: t.redirect || e.redirect || "follow",
                        headers: n,
                        parsedURL: r,
                        signal: i,
                    };
                    this.follow =
                        t.follow !== undefined
                            ? t.follow
                            : e.follow !== undefined
                            ? e.follow
                            : 20;
                    this.compress =
                        t.compress !== undefined
                            ? t.compress
                            : e.compress !== undefined
                            ? e.compress
                            : true;
                    this.counter = t.counter || e.counter || 0;
                    this.agent = t.agent || e.agent;
                }
                get method() {
                    return this[y].method;
                }
                get url() {
                    return O(this[y].parsedURL);
                }
                get headers() {
                    return this[y].headers;
                }
                get redirect() {
                    return this[y].redirect;
                }
                get signal() {
                    return this[y].signal;
                }
                clone() {
                    return new Request(this);
                }
            }
            Body.mixIn(Request.prototype);
            Object.defineProperty(Request.prototype, Symbol.toStringTag, {
                value: "Request",
                writable: false,
                enumerable: false,
                configurable: true,
            });
            Object.defineProperties(Request.prototype, {
                method: { enumerable: true },
                url: { enumerable: true },
                headers: { enumerable: true },
                redirect: { enumerable: true },
                clone: { enumerable: true },
                signal: { enumerable: true },
            });
            function getNodeRequestOptions(e) {
                const t = e[y].parsedURL;
                const r = new Headers(e[y].headers);
                if (!r.has("Accept")) {
                    r.set("Accept", "*/*");
                }
                if (!t.protocol || !t.hostname) {
                    throw new TypeError("Only absolute URLs are supported");
                }
                if (!/^https?:$/.test(t.protocol)) {
                    throw new TypeError("Only HTTP(S) protocols are supported");
                }
                if (e.signal && e.body instanceof s.Readable && !P) {
                    throw new Error(
                        "Cancellation of streamed requests with AbortSignal is not supported in node < 8"
                    );
                }
                let o = null;
                if (e.body == null && /^(POST|PUT)$/i.test(e.method)) {
                    o = "0";
                }
                if (e.body != null) {
                    const t = getTotalBytes(e);
                    if (typeof t === "number") {
                        o = String(t);
                    }
                }
                if (o) {
                    r.set("Content-Length", o);
                }
                if (!r.has("User-Agent")) {
                    r.set(
                        "User-Agent",
                        "node-fetch/1.0 (+https://github.com/bitinn/node-fetch)"
                    );
                }
                if (e.compress && !r.has("Accept-Encoding")) {
                    r.set("Accept-Encoding", "gzip,deflate");
                }
                let n = e.agent;
                if (typeof n === "function") {
                    n = n(t);
                }
                if (!r.has("Connection") && !n) {
                    r.set("Connection", "close");
                }
                return Object.assign({}, t, {
                    method: e.method,
                    headers: exportNodeCompatibleHeaders(r),
                    agent: n,
                });
            }
            function AbortError(e) {
                Error.call(this, e);
                this.type = "aborted";
                this.message = e;
                Error.captureStackTrace(this, this.constructor);
            }
            AbortError.prototype = Object.create(Error.prototype);
            AbortError.prototype.constructor = AbortError;
            AbortError.prototype.name = "AbortError";
            const G = s.PassThrough;
            const A = n.resolve;
            function fetch(e, t) {
                if (!fetch.Promise) {
                    throw new Error(
                        "native promise missing, set fetch.Promise to your favorite alternative"
                    );
                }
                Body.Promise = fetch.Promise;
                return new fetch.Promise(function (r, n) {
                    const a = new Request(e, t);
                    const u = getNodeRequestOptions(a);
                    const l = (u.protocol === "https:" ? i : o).request;
                    const p = a.signal;
                    let d = null;
                    const m = function abort() {
                        let e = new AbortError("The user aborted a request.");
                        n(e);
                        if (a.body && a.body instanceof s.Readable) {
                            a.body.destroy(e);
                        }
                        if (!d || !d.body) return;
                        d.body.emit("error", e);
                    };
                    if (p && p.aborted) {
                        m();
                        return;
                    }
                    const g = function abortAndFinalize() {
                        m();
                        finalize();
                    };
                    const f = l(u);
                    let h;
                    if (p) {
                        p.addEventListener("abort", g);
                    }
                    function finalize() {
                        f.abort();
                        if (p) p.removeEventListener("abort", g);
                        clearTimeout(h);
                    }
                    if (a.timeout) {
                        f.once("socket", function (e) {
                            h = setTimeout(function () {
                                n(
                                    new FetchError(
                                        `network timeout at: ${a.url}`,
                                        "request-timeout"
                                    )
                                );
                                finalize();
                            }, a.timeout);
                        });
                    }
                    f.on("error", function (e) {
                        n(
                            new FetchError(
                                `request to ${a.url} failed, reason: ${e.message}`,
                                "system",
                                e
                            )
                        );
                        finalize();
                    });
                    f.on("response", function (e) {
                        clearTimeout(h);
                        const t = createHeadersLenient(e.headers);
                        if (fetch.isRedirect(e.statusCode)) {
                            const s = t.get("Location");
                            const o = s === null ? null : A(a.url, s);
                            switch (a.redirect) {
                                case "error":
                                    n(
                                        new FetchError(
                                            `uri requested responds with a redirect, redirect mode is set to error: ${a.url}`,
                                            "no-redirect"
                                        )
                                    );
                                    finalize();
                                    return;
                                case "manual":
                                    if (o !== null) {
                                        try {
                                            t.set("Location", o);
                                        } catch (e) {
                                            n(e);
                                        }
                                    }
                                    break;
                                case "follow":
                                    if (o === null) {
                                        break;
                                    }
                                    if (a.counter >= a.follow) {
                                        n(
                                            new FetchError(
                                                `maximum redirect reached at: ${a.url}`,
                                                "max-redirect"
                                            )
                                        );
                                        finalize();
                                        return;
                                    }
                                    const s = {
                                        headers: new Headers(a.headers),
                                        follow: a.follow,
                                        counter: a.counter + 1,
                                        agent: a.agent,
                                        compress: a.compress,
                                        method: a.method,
                                        body: a.body,
                                        signal: a.signal,
                                        timeout: a.timeout,
                                        size: a.size,
                                    };
                                    if (
                                        e.statusCode !== 303 &&
                                        a.body &&
                                        getTotalBytes(a) === null
                                    ) {
                                        n(
                                            new FetchError(
                                                "Cannot follow redirect with body being a readable stream",
                                                "unsupported-redirect"
                                            )
                                        );
                                        finalize();
                                        return;
                                    }
                                    if (
                                        e.statusCode === 303 ||
                                        ((e.statusCode === 301 ||
                                            e.statusCode === 302) &&
                                            a.method === "POST")
                                    ) {
                                        s.method = "GET";
                                        s.body = undefined;
                                        s.headers.delete("content-length");
                                    }
                                    r(fetch(new Request(o, s)));
                                    finalize();
                                    return;
                            }
                        }
                        e.once("end", function () {
                            if (p) p.removeEventListener("abort", g);
                        });
                        let s = e.pipe(new G());
                        const o = {
                            url: a.url,
                            status: e.statusCode,
                            statusText: e.statusMessage,
                            headers: t,
                            size: a.size,
                            timeout: a.timeout,
                            counter: a.counter,
                        };
                        const i = t.get("Content-Encoding");
                        if (
                            !a.compress ||
                            a.method === "HEAD" ||
                            i === null ||
                            e.statusCode === 204 ||
                            e.statusCode === 304
                        ) {
                            d = new Response(s, o);
                            r(d);
                            return;
                        }
                        const u = {
                            flush: c.Z_SYNC_FLUSH,
                            finishFlush: c.Z_SYNC_FLUSH,
                        };
                        if (i == "gzip" || i == "x-gzip") {
                            s = s.pipe(c.createGunzip(u));
                            d = new Response(s, o);
                            r(d);
                            return;
                        }
                        if (i == "deflate" || i == "x-deflate") {
                            const t = e.pipe(new G());
                            t.once("data", function (e) {
                                if ((e[0] & 15) === 8) {
                                    s = s.pipe(c.createInflate());
                                } else {
                                    s = s.pipe(c.createInflateRaw());
                                }
                                d = new Response(s, o);
                                r(d);
                            });
                            return;
                        }
                        if (
                            i == "br" &&
                            typeof c.createBrotliDecompress === "function"
                        ) {
                            s = s.pipe(c.createBrotliDecompress());
                            d = new Response(s, o);
                            r(d);
                            return;
                        }
                        d = new Response(s, o);
                        r(d);
                    });
                    writeToStream(f, a);
                });
            }
            fetch.isRedirect = function (e) {
                return (
                    e === 301 ||
                    e === 302 ||
                    e === 303 ||
                    e === 307 ||
                    e === 308
                );
            };
            fetch.Promise = global.Promise;
            e.exports = t = fetch;
            Object.defineProperty(t, "__esModule", { value: true });
            t.default = t;
            t.Headers = Headers;
            t.Request = Request;
            t.Response = Response;
            t.FetchError = FetchError;
        },
        223: (e, t, r) => {
            var s = r(940);
            e.exports = s(once);
            e.exports.strict = s(onceStrict);
            once.proto = once(function () {
                Object.defineProperty(Function.prototype, "once", {
                    value: function () {
                        return once(this);
                    },
                    configurable: true,
                });
                Object.defineProperty(Function.prototype, "onceStrict", {
                    value: function () {
                        return onceStrict(this);
                    },
                    configurable: true,
                });
            });
            function once(e) {
                var t = function () {
                    if (t.called) return t.value;
                    t.called = true;
                    return (t.value = e.apply(this, arguments));
                };
                t.called = false;
                return t;
            }
            function onceStrict(e) {
                var t = function () {
                    if (t.called) throw new Error(t.onceError);
                    t.called = true;
                    return (t.value = e.apply(this, arguments));
                };
                var r = e.name || "Function wrapped with `once`";
                t.onceError = r + " shouldn't be called more than once";
                t.called = false;
                return t;
            }
        },
        294: (e, t, r) => {
            e.exports = r(219);
        },
        219: (e, t, r) => {
            "use strict";
            var s = r(631);
            var o = r(16);
            var n = r(605);
            var i = r(211);
            var c = r(614);
            var a = r(357);
            var u = r(669);
            t.httpOverHttp = httpOverHttp;
            t.httpsOverHttp = httpsOverHttp;
            t.httpOverHttps = httpOverHttps;
            t.httpsOverHttps = httpsOverHttps;
            function httpOverHttp(e) {
                var t = new TunnelingAgent(e);
                t.request = n.request;
                return t;
            }
            function httpsOverHttp(e) {
                var t = new TunnelingAgent(e);
                t.request = n.request;
                t.createSocket = createSecureSocket;
                t.defaultPort = 443;
                return t;
            }
            function httpOverHttps(e) {
                var t = new TunnelingAgent(e);
                t.request = i.request;
                return t;
            }
            function httpsOverHttps(e) {
                var t = new TunnelingAgent(e);
                t.request = i.request;
                t.createSocket = createSecureSocket;
                t.defaultPort = 443;
                return t;
            }
            function TunnelingAgent(e) {
                var t = this;
                t.options = e || {};
                t.proxyOptions = t.options.proxy || {};
                t.maxSockets =
                    t.options.maxSockets || n.Agent.defaultMaxSockets;
                t.requests = [];
                t.sockets = [];
                t.on("free", function onFree(e, r, s, o) {
                    var n = toOptions(r, s, o);
                    for (var i = 0, c = t.requests.length; i < c; ++i) {
                        var a = t.requests[i];
                        if (a.host === n.host && a.port === n.port) {
                            t.requests.splice(i, 1);
                            a.request.onSocket(e);
                            return;
                        }
                    }
                    e.destroy();
                    t.removeSocket(e);
                });
            }
            u.inherits(TunnelingAgent, c.EventEmitter);
            TunnelingAgent.prototype.addRequest = function addRequest(
                e,
                t,
                r,
                s
            ) {
                var o = this;
                var n = mergeOptions(
                    { request: e },
                    o.options,
                    toOptions(t, r, s)
                );
                if (o.sockets.length >= this.maxSockets) {
                    o.requests.push(n);
                    return;
                }
                o.createSocket(n, function (t) {
                    t.on("free", onFree);
                    t.on("close", onCloseOrRemove);
                    t.on("agentRemove", onCloseOrRemove);
                    e.onSocket(t);
                    function onFree() {
                        o.emit("free", t, n);
                    }
                    function onCloseOrRemove(e) {
                        o.removeSocket(t);
                        t.removeListener("free", onFree);
                        t.removeListener("close", onCloseOrRemove);
                        t.removeListener("agentRemove", onCloseOrRemove);
                    }
                });
            };
            TunnelingAgent.prototype.createSocket = function createSocket(
                e,
                t
            ) {
                var r = this;
                var s = {};
                r.sockets.push(s);
                var o = mergeOptions({}, r.proxyOptions, {
                    method: "CONNECT",
                    path: e.host + ":" + e.port,
                    agent: false,
                    headers: { host: e.host + ":" + e.port },
                });
                if (e.localAddress) {
                    o.localAddress = e.localAddress;
                }
                if (o.proxyAuth) {
                    o.headers = o.headers || {};
                    o.headers["Proxy-Authorization"] =
                        "Basic " + new Buffer(o.proxyAuth).toString("base64");
                }
                l("making CONNECT request");
                var n = r.request(o);
                n.useChunkedEncodingByDefault = false;
                n.once("response", onResponse);
                n.once("upgrade", onUpgrade);
                n.once("connect", onConnect);
                n.once("error", onError);
                n.end();
                function onResponse(e) {
                    e.upgrade = true;
                }
                function onUpgrade(e, t, r) {
                    process.nextTick(function () {
                        onConnect(e, t, r);
                    });
                }
                function onConnect(o, i, c) {
                    n.removeAllListeners();
                    i.removeAllListeners();
                    if (o.statusCode !== 200) {
                        l(
                            "tunneling socket could not be established, statusCode=%d",
                            o.statusCode
                        );
                        i.destroy();
                        var a = new Error(
                            "tunneling socket could not be established, " +
                                "statusCode=" +
                                o.statusCode
                        );
                        a.code = "ECONNRESET";
                        e.request.emit("error", a);
                        r.removeSocket(s);
                        return;
                    }
                    if (c.length > 0) {
                        l("got illegal response body from proxy");
                        i.destroy();
                        var a = new Error(
                            "got illegal response body from proxy"
                        );
                        a.code = "ECONNRESET";
                        e.request.emit("error", a);
                        r.removeSocket(s);
                        return;
                    }
                    l("tunneling connection has established");
                    r.sockets[r.sockets.indexOf(s)] = i;
                    return t(i);
                }
                function onError(t) {
                    n.removeAllListeners();
                    l(
                        "tunneling socket could not be established, cause=%s\n",
                        t.message,
                        t.stack
                    );
                    var o = new Error(
                        "tunneling socket could not be established, " +
                            "cause=" +
                            t.message
                    );
                    o.code = "ECONNRESET";
                    e.request.emit("error", o);
                    r.removeSocket(s);
                }
            };
            TunnelingAgent.prototype.removeSocket = function removeSocket(e) {
                var t = this.sockets.indexOf(e);
                if (t === -1) {
                    return;
                }
                this.sockets.splice(t, 1);
                var r = this.requests.shift();
                if (r) {
                    this.createSocket(r, function (e) {
                        r.request.onSocket(e);
                    });
                }
            };
            function createSecureSocket(e, t) {
                var r = this;
                TunnelingAgent.prototype.createSocket.call(r, e, function (s) {
                    var n = e.request.getHeader("host");
                    var i = mergeOptions({}, r.options, {
                        socket: s,
                        servername: n ? n.replace(/:.*$/, "") : e.host,
                    });
                    var c = o.connect(0, i);
                    r.sockets[r.sockets.indexOf(s)] = c;
                    t(c);
                });
            }
            function toOptions(e, t, r) {
                if (typeof e === "string") {
                    return { host: e, port: t, localAddress: r };
                }
                return e;
            }
            function mergeOptions(e) {
                for (var t = 1, r = arguments.length; t < r; ++t) {
                    var s = arguments[t];
                    if (typeof s === "object") {
                        var o = Object.keys(s);
                        for (var n = 0, i = o.length; n < i; ++n) {
                            var c = o[n];
                            if (s[c] !== undefined) {
                                e[c] = s[c];
                            }
                        }
                    }
                }
                return e;
            }
            var l;
            if (
                process.env.NODE_DEBUG &&
                /\btunnel\b/.test(process.env.NODE_DEBUG)
            ) {
                l = function () {
                    var e = Array.prototype.slice.call(arguments);
                    if (typeof e[0] === "string") {
                        e[0] = "TUNNEL: " + e[0];
                    } else {
                        e.unshift("TUNNEL:");
                    }
                    console.error.apply(console, e);
                };
            } else {
                l = function () {};
            }
            t.debug = l;
        },
        429: (e, t) => {
            "use strict";
            Object.defineProperty(t, "__esModule", { value: true });
            function getUserAgent() {
                if (typeof navigator === "object" && "userAgent" in navigator) {
                    return navigator.userAgent;
                }
                if (typeof process === "object" && "version" in process) {
                    return `Node.js/${process.version.substr(1)} (${
                        process.platform
                    }; ${process.arch})`;
                }
                return "<environment undetectable>";
            }
            t.getUserAgent = getUserAgent;
        },
        940: (e) => {
            e.exports = wrappy;
            function wrappy(e, t) {
                if (e && t) return wrappy(e)(t);
                if (typeof e !== "function")
                    throw new TypeError("need wrapper function");
                Object.keys(e).forEach(function (t) {
                    wrapper[t] = e[t];
                });
                return wrapper;
                function wrapper() {
                    var t = new Array(arguments.length);
                    for (var r = 0; r < t.length; r++) {
                        t[r] = arguments[r];
                    }
                    var s = e.apply(this, t);
                    var o = t[t.length - 1];
                    if (typeof s === "function" && s !== o) {
                        Object.keys(o).forEach(function (e) {
                            s[e] = o[e];
                        });
                    }
                    return s;
                }
            }
        },
        195: (e, t, r) => {
            const s = r(438);
            e.exports = class IssueProcessor {
                constructor(e) {
                    this.config = e;
                    this.octokit = s.getOctokit(e.repoToken);
                    this.context = s.context;
                }
                async *getIssues(e) {
                    let t = 1;
                    while (true) {
                        const r = (
                            await this.octokit.issues.listForRepo({
                                ...this.context.repo,
                                state: "open",
                                sort: "updated",
                                direction: "desc",
                                labels: [e],
                                per_page: 100,
                                page: t,
                            })
                        ).data;
                        if (r.length === 0) break;
                        yield* r;
                        t++;
                    }
                }
                async close(e) {
                    await this.octokit.issues.update({ ...e, state: "closed" });
                }
                async processIssues(e) {
                    for await (const t of this.getIssues(e)) {
                        const r = (await this.octokit.issues.listEvents(t))
                            .data;
                        let s;
                        for (let t = r.length - t; t >= 0; t--) {
                            const o = r[t];
                            if (!o.event === "labeled") continue;
                            if (!o.label.name === e) continue;
                            s = o;
                            break;
                        }
                        if (s === undefined) continue;
                        const o = new Date(s.created_at);
                        if (new Date() - o > 864e5 * config.daysUntilClose) {
                            await closeIssue(t);
                        }
                    }
                }
                async process() {
                    await processIssues(
                        await this.getIssuesNotFollowingTemplate()
                    );
                    await processIssues(await this.getIssuesWithoutTemplate());
                }
            };
        },
        326: (module) => {
            module.exports = eval("require")("actions/core");
        },
        877: (module) => {
            module.exports = eval("require")("encoding");
        },
        357: (e) => {
            "use strict";
            e.exports = require("assert");
        },
        614: (e) => {
            "use strict";
            e.exports = require("events");
        },
        747: (e) => {
            "use strict";
            e.exports = require("fs");
        },
        605: (e) => {
            "use strict";
            e.exports = require("http");
        },
        211: (e) => {
            "use strict";
            e.exports = require("https");
        },
        631: (e) => {
            "use strict";
            e.exports = require("net");
        },
        365: (e) => {
            "use strict";
            e.exports = require("os");
        },
        413: (e) => {
            "use strict";
            e.exports = require("stream");
        },
        16: (e) => {
            "use strict";
            e.exports = require("tls");
        },
        835: (e) => {
            "use strict";
            e.exports = require("url");
        },
        669: (e) => {
            "use strict";
            e.exports = require("util");
        },
        761: (e) => {
            "use strict";
            e.exports = require("zlib");
        },
    };
    var __webpack_module_cache__ = {};
    function __webpack_require__(e) {
        if (__webpack_module_cache__[e]) {
            return __webpack_module_cache__[e].exports;
        }
        var t = (__webpack_module_cache__[e] = { exports: {} });
        var r = true;
        try {
            __webpack_modules__[e].call(
                t.exports,
                t,
                t.exports,
                __webpack_require__
            );
            r = false;
        } finally {
            if (r) delete __webpack_module_cache__[e];
        }
        return t.exports;
    }
    __webpack_require__.ab = __dirname + "/";
    return __webpack_require__(932);
})();

