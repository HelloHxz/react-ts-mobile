interface IRouteParams {
  path: string;
  query?: IQuery;
}

export interface IURLInfo {
  href: string;
  hash: string;
  pathname: string;
  routeSeed: number;
  routeKey: string;
  query: IQuery;
}

interface IQuery {
  [key: string]: string | number | boolean;
}

enum RouteAction {
  FORWARD,
  BACK,
  REFRESH,
  INIT,
}

class URLUtils {
  private routeSeed: number = 0;
  private routeSeedKey: string = '__r';
  public routeAction: RouteAction = RouteAction.INIT;

  public go = (params: IRouteParams): void => {
    this.routeAction = RouteAction.FORWARD;
    window.location.hash = '';
  };

  public back = (params: IRouteParams): void => {
    this.routeAction = RouteAction.BACK;
    window.history.go(-1);
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

export default new URLUtils();
