declare const browser: Browser;

interface Browser {
    actions(): any;
    driver: any;
    executeScript: Function;
    getAllWindowHandles(): [any];
    getProcessedConfig(): any;
    getWindowHandle(): any;
    ignoreSynchronization: boolean;
    manage(): any;
    params: BrowserParams;
    sleep(milliseconds: number): Promise<void>;
    wait: Function;
}

interface BrowserParams {
    accounts: { [key: string]: ApmAccount };
    data: () => TestData;
    pages: () => PageObjects;
}

interface PredixAccount {
    username: string;
    password: string;
    url: string;
}

interface ClassicAccount {
    username: string;
    password: string;
    url: string;
    datasource: string;
}

type ApmAccount = PredixAccount | ClassicAccount;

type TestData = any;

interface PageObjects {
    acaDatasheet: AcaDatasheet;
    acaOverview: AcaOverview;
    actionManagement: ActionManagement;
    apm: Apm;
    assetHierarchy: AssetHierarchy;
    help: Help;
    leftNav: LeftNav;
    loginManager: LoginManager;
    loginPage: LoginPage;
    metricsOverview: MetricsOverview;
    recommendation: Recommendation;
    recordManager: RecordManager;
    riskMatrix: RiskMatrix;
    search: Search;
    tmCalculation: ThicknessMonitoring;
}

interface AcaDatasheet {
    createAcaRecord(id: string): Promise<void>;
    createAcaSystem(id: string): Promise<void>;
    waitUntilReady(): Promise<void>;
}

interface AcaOverview {
    clickNewAnalysis(): Promise<void>;
}

interface ActionManagement {
    requestApproval(): Promise<void>;
    waitForStateManagementValueToEqual(value: string): Promise<void>;
}

interface Apm {
    getUsername(): Promise<string>;
    isReady(): Promise<boolean>;
    open(url: string): Promise<void>;
    waitUntilErrorDialogVisible(): Promise<void>;
    waitUntilReady(): Promise<void>;
}

interface AssetHierarchy {
    open(): Promise<void>;
    findAsset(searchText: string): Promise<void>;
    inHierarchy(label: string): Promise<void>;
    openThicknessMonitoring(): Promise<void>;
    selectAsset(label: string): Promise<void>;
    selectHome(): Promise<void>;
}

interface Help {
    open(): Promise<void>;
    isReady(): Promise<void>;
}

interface LeftNav {
    isLogoPresent(): Promise<boolean>;
    logOut(): Promise<void>;
    openAca(): Promise<void>;
    waitUntilLogoPresent(): Promise<void>;
}

interface LoginManager {
    ensureLogin(account: ApmAccount): Promise<void>;
    waitForLogin(account: ApmAccount, times: { waitTime: Minutes; interval: Minutes }): Promise<void>;
}

interface LoginPage {
    clickSignIn(): Promise<void>;
    isReady(): Promise<boolean>;
    logIn(username: string, password: string, datasource?: string): Promise<void>;
    waitUntilReady(): Promise<void>;
}

type MetricsOverview = any;

interface Recommendation {
    clickAddNewItem(): Promise<void>;
    clickRecommendationArrow(): Promise<void>;
    clickRecommendationIcon(): Promise<void>;
    createRecommendation(): Promise<void>;
    fillOutRecommendationDate(): Promise<void>;
    fillOutShortDescription(): Promise<void>;
    saveRecommendation(): Promise<void>;
}

interface RecordManager {
    createRecord(family: string, data: any, expectedToastText: string);
    linkToExistingRecord(family: string): Promise<void>;
    openRecordManager(family: string): Promise<void>;
    selectAllPossibleFamilies(): Promise<void>;
    selectFamily(family: string): Promise<void>;
}

interface RiskMatrix {
    openSummary(): Promise<void>;
    update(): Promise<void>;
    waitForValueToEqual(value: string): Promise<void>;
}

interface Search {
    searchFor(value: string): Promise<void>;
    inSearchResults(value: string): Promise<void>;
}

interface ThicknessMonitoring {
    addTml(id: string): Promise<void>;
    calculate(): Promise<void>;
    clickUpdateSettings(): Promise<void>;
    checkdialog(): Promise<void>;
    createReading(value: string): Promise<void>;
    deleteAllTmls(): Promise<void>;
    enterDefInspInterval(months: string, alternativeValue: string): Promise<void>;
    exitAnalysisSettings(): Promise<void>;
    openAnalysisSettings(): Promise<void>;
    waitUntilCalculatedDateIsVisible(): Promise<void>;
    waitUntilReady(): Promise<void>;
}
