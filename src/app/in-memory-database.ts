import { InMemoryDbService } from 'angular-in-memory-web-api'
import { Categories } from './pages/categories/shared/category.model'

export class InMemoryDatadBase implements InMemoryDbService {
  createDb(){
    const categories: Categories[] = [
      { id: 1, name: "Lazer", description: "Cinema, parques, praia e etc"},
      { id: 2, name: "Saúde", description: "Ṕlanos de saúde e Remédios"},
      { id: 3, name: "Moradia", description: "Pagamentos de conta de casa"},
      { id: 4, name: "Salário", description: "Recebimento de Salário"},
      { id: 5, name: "Freelas", description: "Trabalhos como freelancer"},
    ]

    return { categories }
  }
}
