export interface IURLInfo {
  href: string;
  hash: string;
  pathname: string;
  pagename: string;
  routeSeed: number;
  routeKey: string;
  query: IQuery;
}

export interface IQuery {
  [key: string]: string | number | boolean;
}

class RouteUtils {
  public routeSeedKey: string = '';

  public setRouteSeedKey = (seed: string): void => {
    this.routeSeedKey = seed;
  };

  public getUrlInfo = (): IURLInfo => {
    const re = {
      href: window.location.href,
      hash: window.location.hash,
      pathname: window.location.pathname,
    };
    const pagename = this.getPathFromUrl(re as IURLInfo);
    const routeSeed = this._getRouteSeed(this.getQueryFromUrl(re as IURLInfo));
    const query = this.getQueryFromUrl(re as IURLInfo) || {};
    return {
      ...re,
      ...{
        routeSeed: routeSeed,
        pagename,
        routeKey: `${pagename}_${routeSeed}`,
        query,
      },
    };
  };

  public getCurrentPageNameByRoutePath = (routePath: string): { pageName: string; remaining: string } => {
    const nameArr: string[] = routePath.split('/');
    const re = {
      pageName: '',
      remaining: '',
    };
    const remainArr: string[] = [];
    for (let i = 0, j = nameArr.length; i < j; i += 1) {
      const pn = nameArr[i];
      if (pn !== '') {
        if (re.pageName === '') {
          re.pageName = pn;
        } else {
          remainArr.push(pn);
        }
      }
    }
    re.remaining = remainArr.join('/');
    return re;
  };

  public combinePathAndQuery = (path: string, query?: IQuery): string => {
    let _path: string = path || '';
    if (_path.indexOf('#') === 0) {
      _path = _path.substring(1);
    }
    let hash = `#${_path}`;
    if (!query) {
      return hash;
    }
    const queryStr = this.queryToString(query);
    if (queryStr.length > 0) {
      hash = `${hash}?${queryStr}`;
    }
    return hash;
  };

  private queryToString = (query: IQuery): string => {
    const queryArr: string[] = [];
    const _query: IQuery = query || {};
    for (const key in _query) {
      const pVal: string | boolean | number = _query[key];
      if (!isNaN(pVal as number) || typeof pVal === 'string' || pVal === false || pVal === true) {
        queryArr.push(`${key}=${encodeURIComponent(pVal)}`);
      }
    }
    return queryArr.join('&');
  };

  public getQueryFromUrl = (_urlInfo: IURLInfo | null): IQuery => {
    const urlInfo = _urlInfo || this.getUrlInfo();
    const queryStr = this.getQueryStringFromUrl(urlInfo);
    if (queryStr === '') {
      return {};
    }
    let re: {
      [key: string]: string;
    } = {};
    const queryArr = queryStr.split('&');
    for (let i = 0, j = queryArr.length; i < j; i += 1) {
      const keyValueArr = queryArr[i].split('=');
      if (keyValueArr.length === 2) {
        re = re || {};
        const [key, value] = keyValueArr;
        re[key] = decodeURIComponent(value);
      }
    }
    return re;
  };
  public getQueryStringFromUrl = (_urlInfo: IURLInfo | null): string => {
    const urlInfo = _urlInfo || this.getUrlInfo();
    const Arr = urlInfo.href.split('?');
    if (Arr.length < 2) {
      return '';
    }
    const str = Arr[Arr.length - 1];
    const strArr = str.split('#');
    return strArr[0];
  };

  private getPathFromUrl = (_urlInfo?: IURLInfo): string => {
    const urlInfo = _urlInfo || this.getUrlInfo();
    const nameArr = urlInfo.hash.split('#');
    const s = nameArr[1];
    if (!s) {
      return '';
    }
    const sArr = s.split('?');
    return sArr[0] || '';
  };
  private _getRouteSeed = (query: IQuery): number => {
    const _query = query || {};
    const routeSeed: string = (_query[this.routeSeedKey] || '0').toString();
    let re: number = parseInt(routeSeed, 10);
    if (isNaN(re)) {
      re = 0;
    }
    return re;
  };
}

export default new RouteUtils();
