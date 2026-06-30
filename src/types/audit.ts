export interface CreateAuditRequest {
  url: string;
  keyword: string;
}

export interface AuditResponse {
  audit_id: string;
  status: string;
}