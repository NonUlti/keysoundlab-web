/**
 * 오디오 노드 그래프 빌더
 * 복잡한 오디오 처리 체인을 구성하기 위한 유틸리티
 */
export class AudioGraph {
  private context: AudioContext;
  private nodes: AudioNode[] = [];

  constructor(context: AudioContext) {
    this.context = context;
  }

  /**
   * 노드를 그래프에 추가
   */
  public addNode(node: AudioNode): this {
    this.nodes.push(node);
    return this;
  }

  /**
   * 노드들을 순차적으로 연결
   */
  public connect(destination: AudioNode): this {
    if (this.nodes.length === 0) {
      throw new Error('No nodes to connect');
    }

    for (let i = 0; i < this.nodes.length - 1; i++) {
      this.nodes[i].connect(this.nodes[i + 1]);
    }

    this.nodes[this.nodes.length - 1].connect(destination);
    return this;
  }

  /**
   * 첫 번째 노드 반환 (입력 노드)
   */
  public getInputNode(): AudioNode | null {
    return this.nodes[0] ?? null;
  }

  /**
   * 마지막 노드 반환 (출력 노드)
   */
  public getOutputNode(): AudioNode | null {
    return this.nodes[this.nodes.length - 1] ?? null;
  }

  /**
   * 모든 노드 연결 해제
   */
  public disconnect(): void {
    this.nodes.forEach(node => node.disconnect());
  }

  /**
   * 그래프 리셋
   */
  public reset(): void {
    this.disconnect();
    this.nodes = [];
  }
}
