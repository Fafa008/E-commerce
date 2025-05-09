import React, { useState, useRef, useCallback } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import Shirt from './objects/Shirt'

const ShirtCustomizer = () => {
  // Références
  const fileInputRef = useRef(null)
  const designCanvasRef = useRef(null)
  
  // États
  const [designState, setDesignState] = useState({
    baseTexture: '',
    logoTexture: null,
    text: 'Hello world',
    textColor: '#FF0000',
    textFont: 'bold 60px Arial'
  })
  const [showAIPrompt, setShowAIPrompt] = useState(false)
  const [aiPrompt, setAIPrompt] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  
  // Sauvegarder l'état initial
  const initialState = {
    baseTexture: '',
    logoTexture: null,
    text: '',
    textColor: '',
    textFont: 'bold 60px Arial'
  }

  // Gestionnaire d'importation de fichier optimisé
  const handleFileUpload = useCallback((event, type) => {
    const file = event.target.files[0]
    if (!file) return
    
    const reader = new FileReader()
    reader.onload = (e) => {
      setDesignState(prev => ({
        ...prev,
        [type === 'texture' ? 'baseTexture' : 'logoTexture']: e.target.result
      }))
    }
    reader.readAsDataURL(file)
  }, [])

  // Déclencher l'importation de fichier
  const triggerFileInput = useCallback((type) => {
    if (fileInputRef.current) {
      fileInputRef.current.dataset.type = type
      fileInputRef.current.click()
    }
  }, [])

  // Gestionnaire IA avec async/await
  const handleAIGenerate = useCallback(async () => {
    if (!aiPrompt.trim()) return
    
    setIsGenerating(true)
    
    try {
      // Simulation d'appel API (remplacer par un vrai appel)
      const mockResult = await new Promise(resolve => {
        setTimeout(() => resolve('/textures/ai_generated_mock.png'), 2000)
      })
      
      setDesignState(prev => ({ ...prev, baseTexture: mockResult }))
    } catch (error) {
      console.error("Erreur de génération IA:", error)
    } finally {
      setIsGenerating(false)
      setShowAIPrompt(false)
    }
  }, [aiPrompt])

  // Réinitialisation
  const resetDesign = useCallback(() => {
    setDesignState(initialState)
    if (designCanvasRef.current) {
      designCanvasRef.current.clear()
    }
  }, [initialState])

  // Gestion des modifications de texte
  const handleTextChange = useCallback((e) => {
    setDesignState(prev => ({ ...prev, text: e.target.value }))
  }, [])

  // Gestion de la couleur
  const handleColorChange = useCallback((e) => {
    setDesignState(prev => ({ ...prev, textColor: e.target.value }))
  }, [])

  return (
    <div className="flex flex-col md:flex-row h-screen w-full bg-gray-50">
      {/* Input de fichier caché */}
      <input 
        type="file" 
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={(e) => handleFileUpload(e, fileInputRef.current.dataset.type)}
      />
      
      {/* Viewer 3D */}
      <div className="w-full md:w-2/3 h-96 md:h-full bg-gray-200 relative">
        <Canvas 
          camera={{ position: [0, 0, 2.5], fov: 30 }} 
          gl={{ preserveDrawingBuffer: true }} // Pour permettre les captures d'écran
        >
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <Shirt 
            {...designState}
            onDesignCanvasReady={(canvas) => designCanvasRef.current = canvas}
          />
          <OrbitControls 
            enablePan={true} 
            enableZoom={true} 
            enableRotate={true}
            minPolarAngle={Math.PI / 6}
            maxPolarAngle={Math.PI / 1.5}
          />
          <Environment preset="city" />
        </Canvas>
      </div>
      
      {/* Panneau de contrôle */}
      <div className="w-full md:w-1/3 p-4 bg-white shadow-lg overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Personnalisation</h2>
        
        {/* Bouton de réinitialisation */}
        <button 
          onClick={resetDesign}
          className="w-full p-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition mb-6"
        >
          Réinitialiser le design
        </button>
        
        {/* Section textures */}
        <div className="mb-6 p-4 bg-gray-100 rounded-lg">
          <h3 className="font-semibold text-lg mb-3">Textures et logos</h3>
          
          <div className="grid grid-cols-2 gap-3 mb-3">
            <button 
              onClick={() => triggerFileInput('texture')}
              className="p-2 bg-white border border-gray-300 rounded hover:bg-gray-50 transition"
            >
              Texture de base
            </button>
            
            <button 
              onClick={() => triggerFileInput('logo')}
              className="p-2 bg-white border border-gray-300 rounded hover:bg-gray-50 transition"
            >
              Importer un logo
            </button>
          </div>
          
          <button 
            onClick={() => setShowAIPrompt(true)}
            className="w-full p-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded hover:opacity-90 transition"
          >
            ✨ Générer avec IA
          </button>
        </div>
        
        {/* Section texte */}
        <div className="mb-6 p-4 bg-gray-100 rounded-lg">
          <h3 className="font-semibold text-lg mb-3">Personnalisation du texte</h3>
          
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">Texte</label>
            <input
              type="text"
              value={designState.text}
              onChange={handleTextChange}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">Couleur du texte</label>
            <div className="flex items-center">
              <input
                type="color"
                value={designState.textColor}
                onChange={handleColorChange}
                className="w-10 h-10 cursor-pointer mr-2"
              />
              <span className="text-sm text-gray-600">{designState.textColor}</span>
            </div>
          </div>
        </div>
        
        {/* Bouton de sauvegarde */}
        <button 
          className="w-full p-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
          onClick={() => {
            // Ici vous pourriez implémenter la sauvegarde du design
            alert('Design sauvegardé! (implémentez la logique de sauvegarde ici)')
          }}
        >
          Sauvegarder le design
        </button>
      </div>
      
      {/* Modal IA */}
      {showAIPrompt && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-2xl">
            <h3 className="text-xl font-bold mb-4 text-gray-800">Génération par IA</h3>
            
            <p className="text-sm text-gray-600 mb-3">
              Décrivez le design que vous souhaitez générer. Soyez aussi précis que possible.
            </p>
            
            <textarea
              value={aiPrompt}
              onChange={(e) => setAIPrompt(e.target.value)}
              placeholder="Ex: Un motif géométrique bleu et jaune avec des triangles entrelacés"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent mb-4 h-32"
            />
            
            <div className="flex gap-3">
              <button 
                onClick={() => setShowAIPrompt(false)}
                className="flex-1 p-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
              >
                Annuler
              </button>
              
              <button 
                onClick={handleAIGenerate}
                disabled={isGenerating}
                className={`flex-1 p-2 text-white rounded-lg transition ${
                  isGenerating ? 'bg-purple-400' : 'bg-purple-500 hover:bg-purple-600'
                }`}
              >
                {isGenerating ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Génération...
                  </span>
                ) : 'Générer'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ShirtCustomizer